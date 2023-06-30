import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Avatar } from "@mui/material";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import Watchlist from "./Watchlist";

function Profile(props) {

    const navigate = useNavigate();

    function logout() {
        const cookies = document.cookie;
        let token = cookies.split('; ').find((cookie) => {
        return cookie.startsWith('usercookie=')
        }).split('=')[1];
        fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include",
            withCredentials: true
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if(json.status === 201) {
                console.log("Logging out");
                navigate(0);
                navigate("/Register");
            }
            else {
                console.log("Logout error");
            }
        });
    }

    return <div className="profile">
        <Sidebar></Sidebar>
        <div className="main">
            <div className="profile-div">
                <div className="profile-details">
                    <h1>{props.user.firstName}'s Profile</h1>
                    <hr />
                    <div className="avatar">
                        <Avatar sx={{height: 56, width: 56}}>{props.user.firstName.slice(0, 1).toUpperCase()}</Avatar>
                    </div>
                    <div className="user-details">
                        <p className="user-details-label">Name: </p>
                        <p className="user-personal-details">{props.user.firstName} {props.user.lastName}</p>
                        <p className="user-details-label">Email: </p>
                        <p className="user-personal-details">{props.user.username}</p>
                    </div>
                </div>
                <button className="logout-btn" onClick={logout}>Logout</button>
                <Watchlist list={props.user.watchlist}></Watchlist>
            </div>
        </div>
    </div>
}

export default Profile;