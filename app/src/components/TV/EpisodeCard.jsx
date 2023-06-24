import React from "react";
import "./episodecard.css";

function EpisodeCard(props) {
    return <div className="episodecard">
        <div className="episodeimg">
            <img src={`https://image.tmdb.org/t/p/original${props.episode.still_path}`} alt="" style={{width: "100%"}}/>
        </div>
        <div className="episodedetails">
            <div className="episodename">
                <h3>{`${props.episode.episode_number}. ${props.episode.name}`}</h3>
            </div>
            <div className="episodereleasedetails">
                <h4>{`${props.episode.air_date}   |   ${props.episode.runtime}m`}</h4>
            </div>
            <div className="episodeoverview">
                <p>{props.episode.overview}</p>
            </div>
        </div>
    </div>
}

export default EpisodeCard;