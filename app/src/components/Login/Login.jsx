import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function login() {
        console.log(process.env.REACT_APP_BASE_URL);
        fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            credentials: "include",
            withCredentials: true
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if(json.status === 201) {
                console.log("Login successful!!");
                // navigate(0);
                // navigate("/");
            }
            else {
                alert(`${json.message}`);
            }
        });
    }


    return <div className="login">
        <img src="images/netflix_logo.png" alt="" className="logo"/>
        <div className="center">
            <div className="box">
                <h1>Sign In</h1>
                <input type="email" className="emailInp" placeholder="Email or phone number" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className="passwordInp" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button className="signInBtn" onClick={login}><strong>Sign In</strong></button>
                <div className="boxText">
                    <div className="leftPart">
                        <input type="checkbox" />
                        <label htmlFor="">Remember Me</label>
                    </div>
                    <div className="rightPart">
                        <span>Need Help?</span>
                    </div>
                </div>
                <div className="signUp">
                    <span style={{color: "rgb(179,179,179)"}}>New to Netflix? </span>
                    <Link to="/Register" className="text-link"><span style={{color: "white", cursor: "pointer"}}>Sign Up Now</span></Link>
                </div>
            </div>
        </div>
    </div>
}

export default Login;