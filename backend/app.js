const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./user");
const authenticate = require("./authenticate");
require('dotenv').config();
const PORT = process.env.PORT || 4000

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("*", cors({
    origin: true, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

app.post("/uniqueUser", (req, res) => {
    const email = req.body.email;
    User.findOne({username: email}).then((user) => {
        if(user) 
            res.send(false);
        else 
            res.send(true);
    })
});

app.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    try {
        console.log(newUser);
        const data = await newUser.save();
        res.send({status:201, data});
    }
    catch(err) {
        res.send(err);
    }
});

app.post("/login", async (req, res) => {
    try {
        const userValid = await User.findOne({username:req.body.email});
        if(userValid){
            const isMatch = await bcrypt.compare(req.body.password,userValid.password);
            if(!isMatch){
                res.send({ status:401, message: "Invalid password!"})
            }else{
                const token = await userValid.generateAuthToken();
                console.log(app.get("env"));
                res.cookie("usercookie", token, {
                    expires:new Date(Date.now() + 24*60*60*1000),
                    httpOnly: false,
                    sameSite: process.env.NODE_ENV === "development" ? true : "none",
                    secure: process.env.NODE_ENV === "development" ? false : true,
                });
                res.cookie("uid", userValid._id.toString(), {
                    expires:new Date(Date.now() + 24*60*60*1000),
                    httpOnly: false,
                    sameSite: process.env.NODE_ENV === "development" ? true : "none",
                    secure: process.env.NODE_ENV === "development" ? false : true,
                });
                res.send({status:201, token:token});
            }
        }
        else {
            res.send({status:401, message: "Username does not exist!"});
        }
    } catch (error) {
        res.send({status: 401, message: error});
        console.log(error);
    }
});

app.get("/user", async (req, res) => {
    const response = await authenticate(req, res);
    console.log(response);
    if(response.status === 201) 
        res.send({status:201, user:req.user});
    else
        res.send({status:401, user:null});
});

app.get("/logout", async (req, res) => {
    try {
        const response = await authenticate(req, res);
        if(response.status === 201) {
            req.user.tokens = req.user.tokens.filter((curr) => {
                curr.token !== req.token;
            })
    
            res.clearCookie("usercookie", {path:"/"});
            req.user.save();
            res.send({status:201, message:"User logged out successfully"})
        }
    }
    catch(err) {
        console.log(err);
        res.send({status:401, message:"Unsuccessful logout attempt"});
    }
});

app.post("/watchlist/check", async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId});
        const itemId = user.watchlist.find(element => Number(element.id) === Number(req.body.itemId));
        if(itemId) {
            res.send({status: 201, found:true});
        }
        else {
            res.send({status:201, found:false});
        }
    }
    catch(err) {
        console.log(err);
        res.send({status:401});
    }
});

app.post("/watchlist/add", async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId});
        const itemId = user.watchlist.find(element => Number(element.id) === Number(req.body.itemId));
        if(itemId === undefined) {
            user.watchlist.push({id: req.body.itemId, img: req.body.imgPath, type: req.body.type, title: req.body.title});
            await user.save();
        }
        res.send({status: 201});
    }
    catch(err) {
        console.log(err);
        res.send({status: 401});
    }
});

app.post("/watchlist/remove", async (req, res) => {
    try {
        const user = await User.findOne({_id: req.body.userId});
        user.watchlist = user.watchlist.filter(element => Number(element.id) !== Number(req.body.itemId))
        await user.save();
        res.send({status: 201});
    }
    catch(err) {
        console.log(err);
        res.send({status: 401});
    }
});


app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});