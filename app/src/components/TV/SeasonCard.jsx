import React from "react";
import "./seasoncard.css";

function SeasonCard(props) {
    return <div className="seasoncard">
        <div className="seasonposter">
            <img src={`https://image.tmdb.org/t/p/original${props.season.poster_path}`} alt="" />
        </div>
        <div className="seasondetails">
            <h2 className="seasonname">{props.season.name}</h2>
            <p>Episode Count: {props.season.episode_count ? props.season.episode_count : props.season.episodes.length} | Air Date: {props.season.air_date}</p>
            <h4 className="seasonoverview">{props.season.overview}</h4>
        </div>
    </div>
}

export default SeasonCard;