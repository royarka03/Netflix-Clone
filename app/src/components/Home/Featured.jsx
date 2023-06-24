import React, { useMemo, useState } from "react";
import "./featured.css";
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";

function Featured(props) {

    const [item, setItem] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useMemo(() => {
        setLoaded(false);
        const fetchGenresAndID = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/${props.type}/${props.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits`);
            res.json().then(data => {
                setItem(data);
                setLoaded(true);
            });
        }
        fetchGenresAndID();
    }, [props.type, props.id]);

    function getRuntime(time) {
        let m = time % 60, h = Math.floor(time / 60);
        let s = "";
        if(h !== 0)
            s += h + "h "
        if(m !== 0)
            s += m + "m"
        return s + " | "
    }

    if(loaded)  return <>
        <div className="featured" style={{backgroundImage: window.innerWidth > 600 ? (item.backdrop_path !== null ? ("linear-gradient(90deg, rgba(5,7,6,1) 0%, rgba(255,255,255,0) 60%), url(https://image.tmdb.org/t/p/original" + item.backdrop_path) : "linear-gradient(90deg, rgba(5,7,6,1) 0%, rgba(255,255,255,0) 60%), url(images/startimg.jpg)") : ("linear-gradient(90deg, rgba(5,7,6,1) 0%, rgba(255,255,255,0) 60%), url(https://image.tmdb.org/t/p/original" + item.poster_path)}}>
            <div className="description">
                <div className="titleLogo">
                    <h1>{props.type === "movie" ? item.title : item.name}</h1>
                </div>
                <div className="details">
                    <span>{`${(props.type === "movie" ? item.release_date.slice(0, 4) : item.first_air_date.slice(0, 4)) + "  |  "}${(item.adult === false ? "UA" : "A") + "  |  "}${props.type === "tv" ? item.number_of_seasons + " Seasons  |  " : getRuntime(Number(item.runtime))}${item.genres.map(genre => genre.name).join(", ")}`}</span>
                </div>
                <div className="brief">
                    <span>{item.overview.length >= 300 ? item.overview.slice(0, 300) + "..." : item.overview}</span>
                </div>
                <div className="crew">
                    <div>
                        <span style={{color: "grey"}}>Cast: </span>
                        <span>{item.credits.cast.slice(0, 3).map(cast => cast.name).join(",")}</span>
                    </div>
                    <div>
                        <span style={{color: "grey"}}>Crew: </span>
                        <span>{item.credits.crew.slice(0, 3).map(crew => crew.name).join(",")}</span>
                    </div>
                </div>
                <div className="featuredPlayBtn">
                    <Link to={{pathname: `/${props.type}/${item.id}`}} className="text-link">
                        <button className="playBtn">
                            <ListItem >
                                <ListItemText>Play</ListItemText>
                                <ListItemIcon><PlayCircleOutlineOutlinedIcon sx={{color:"white"}} style={{padding: "0 0 0 1rem"}}/></ListItemIcon>
                            </ListItem>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default Featured;