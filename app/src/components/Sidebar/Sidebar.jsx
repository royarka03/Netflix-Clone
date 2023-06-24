import React from "react";
import "./sidebar.css";
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined';
import { Link } from "react-router-dom";

function Sidebar() {
    return <div className="sidebar">
        <Link to='/'><img src="/images/netflix_logo.png" alt="" style={{height:"3rem", paddingTop:"1rem"}}/></Link>
        <div className="barIcons">
            <Link to='/search'><div className="barIcon"><SearchIcon sx={{ color: "white" }} /></div></Link>
            <Link to="/"><div className="barIcon"><HomeOutlinedIcon sx={{ color: "white" }} /></div></Link>
            <Link to='/profile'><div className="barIcon"><AccountCircleIcon sx={{ color: "white" }} /></div></Link>
            <Link to="/tv"><div className="barIcon"><TvOutlinedIcon sx={{color: "White"}} /></div></Link>
            <Link to="/movie"><div className="barIcon"><MovieCreationOutlinedIcon sx={{color: "White"}} /></div></Link>
        </div>
    </div>
}

export default Sidebar;