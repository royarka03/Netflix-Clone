import {React, useEffect, useState} from "react";
import "./tv.css";
import Sidebar from "../Sidebar/Sidebar";
import Slider from "../Slider/Slider";
import SeasonCard from "./SeasonCard";
import { Link, useParams } from "react-router-dom";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { ListItem, ListItemText, ListItemIcon } from "@mui/material";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function TV() {
    
    const [added, setAdded] = useState(false);
    const {id} = useParams();

    const [tv, setTv] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [idList, setIdList] = useState("");

    function add() {
        const cookies = document.cookie;
        let uid = cookies.split('; ').find((cookie) => {
            return cookie.startsWith('uid=')
        }).split('=')[1];
        fetch("http://localhost:4000/watchlist/add", {
            method: "POST",
            body: JSON.stringify({
                itemId: id,
                userId: uid,
                imgPath: tv.poster_path,
                type: "tv",
                title: tv.name
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            withCredentials: true
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 201) {
                setAdded(true);
            }
        });
    }

    function remove() {
        const cookies = document.cookie;
        let uid = cookies.split('; ').find((cookie) => {
            return cookie.startsWith('uid=')
        }).split('=')[1];
        fetch("http://localhost:4000/watchlist/remove", {
            method: "POST",
            body: JSON.stringify({
                itemId: id,
                userId: uid
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            withCredentials: true
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 201) {
                setAdded(false);
            }
        });
    }

    useEffect(() => {
        const fetchTV = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            res.json().then(data => {
                setTv(data);
                const ids = [];
                data.genres.forEach((genre) => {
                    ids.push(genre.id)
                });
                setIdList(ids.join(","));
                setLoaded(true);
            });
        }
        fetchTV();
    }, [id]);

    useEffect(() => {
        const fetchAdded = async () => {
            console.log(id);
            const cookies = document.cookie;
            let uid = cookies.split('; ').find((cookie) => {
                return cookie.startsWith('uid=')
            }).split('=')[1];
            fetch("http://localhost:4000/watchlist/check", {
                method: "POST",
                body: JSON.stringify({
                    itemId: id,
                    userId: uid
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                withCredentials: true
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 201) {
                    console.log(data.found);
                    setAdded(data.found);
                }
            });
        }
        fetchAdded();
    }, [id]);

    return <>
        {loaded ? (<>
                <Sidebar></Sidebar>
                <div className="main">
                    <div className="moviebackdrop">
                    <div className="moviebackdropdetails" >
                            <div className="moviebackdropgrid">
                                <div className="moviebackdroptitle">
                                    <p>{tv.name}</p>
                                </div>
                                <button className="watchlistBtn" onClick={added ? remove : add}>
                                    <ListItem >
                                        <ListItemText>{added ? "Remove from WatchList" : "Add to WatchList"}</ListItemText>
                                        <ListItemIcon>{added ? <PlaylistRemoveIcon sx={{color: "white"}}/> : <PlaylistAddIcon sx={{color: "white"}}/>}</ListItemIcon>
                                    </ListItem>
                                </button>
                            </div>
                        </div>
                        <img src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`} alt="" style={{width: "100%"}}/>
                    </div>
                    <div className="tvDetails">
                        <h1 className="tvTitle">{tv.name}</h1>
                        <p className="tvOverview">{tv.overview}</p>
                    </div>
                    <h1>Seasons</h1>
                    {tv.seasons.map((season) => {
                        return <Link to={{pathname: `/tv/${tv.id}/season/${season.season_number}`}} className="text-link"><SeasonCard season={season}/></Link>
                    })}
                    <Slider genre={{name:"More Like This", id:{idList}, ignore:{id}}} type="tv"></Slider>
                </div>
            </>
        ) : (
            <LoadingScreen />
        )}
    </>
}

export default TV;