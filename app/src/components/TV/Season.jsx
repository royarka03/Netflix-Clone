import React from "react";
import "./season.css";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useState, useEffect } from "react";
import SeasonCard from "./SeasonCard";
import EpisodeCard from "./EpisodeCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function Season() {
    const {id, sid} = useParams();
    const [loaded, setLoaded] = useState(false);
    const [season, setSeason] = useState(null);

    useEffect(() => {
        const fetchTV = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${sid}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            res.json().then(data => {
                setSeason(data);
                setLoaded(true);
            });
        }
        fetchTV();
    }, [id, sid]);

    return <>
        {loaded ? (<>
            <Sidebar></Sidebar>
            <div className="main">
                <SeasonCard season={season}></SeasonCard>
                <div className="episodes">
                    <h2>Episodes</h2>
                    {season.episodes.map((episode) => {
                        return <Link to={{pathname: `/tv/${id}/season/${season.season_number}/episode/${episode.episode_number}/watch`}} className="text-link"><EpisodeCard episode={episode} /></Link>
                    })}
                </div>
            </div>
        </>) : (
            <LoadingScreen />
        )}
    </>
}

export default Season;
