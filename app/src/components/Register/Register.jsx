import {React, useState} from "react";
import "./register.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from "./Card";
import QnA from "./QnA";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const items = [
    {
        path: "images/img1.png",
        heading: "Enjoy on your TV.",
        content: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more."
    },
    {
        path: "images/img2.png",
        heading: "Watch everywhere.",
        content: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
    },
    {
        path: "images/img3.png",
        heading: "Create profiles for children.",
        content: "Send children on adventures with their favourite characters in a space made just for them—free with your membership."
    },
    {
        path: "images/img4.png",
        heading: "Download your shows to watch offline.",
        content: "Save your favourites easily and always have something to watch."
    }
];

const questions = [
    {
        question: "What is Netflix?",
        answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!"
    },
    {
        question: "How much does Netflix cost?",
        answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts.",
    },
    {
        question: "Where can I watch?",
        answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
    },
    {
        question: "How do I cancel?",
        answer: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
    },
    {
        question: "What can I watch on Netflix?",
        answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
    },
    {
        question: "Is Netflix good for kids?",
        answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
    }
];

function Register() {

    const [started, setStarted] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function start() {
        fetch("http://localhost:4000/uniqueUser", {
            method: "POST",
            body: JSON.stringify({
                email: email
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(json => {
            if(json === true) {
                setStarted(true);
            }
            else {
                alert("Email already exists!\nTry signing in instead.");
            }
        });
    }

    function register() {
        fetch("http://localhost:4000/register", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if(json.status === 201) {
                console.log("Registration successful!!");
                alert("Registration successful!\nPlease log in to continue.");
                navigate("/login");
            }
        });
    }


    return <div>
        <Navbar></Navbar>
        <div className="startcard">
            <p className="headings">Unlimited movies, TV shows and more.</p>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            {!started && (<>
                <input type="email" className="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
                <button className="getstartedbtn" onClick={start}>Get Started<ArrowForwardIosIcon fontSize="small"/></button>
            </>)}
            {started && (<>
                <input type="text" className="firstName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" className="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>
                <input type="text" className="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button className="registerButton" onClick={register}>Register</button>
            </>)}
        </div>
        {items.map((item, index) => {
            return <Card item={item} key={index} id={index} />;
        })}
        <div className="faq">
            <h2>Frequently Asked Questions</h2>
            {questions.map((question, index) => {
                return <QnA item={question} key={index} id={`a${index}`} />;
            })}
        </div>
    </div>
}

export default Register;