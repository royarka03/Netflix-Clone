import {React, useEffect, useState} from "react";
import "./movie.css";
import Sidebar from "../Sidebar/Sidebar";
import Slider from "../Slider/Slider";
import { useParams, Link } from "react-router-dom";
import { ListItem, ListItemText, ListItemIcon } from "@mui/material";
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function Movie() {
    
    const [added, setAdded] = useState(false);
    const {id} = useParams();

    const [movie, setMovie] = useState(null);
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
                imgPath: movie.poster_path,
                type: "movie",
                title: movie.title
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
        const fetchMovie = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            res.json().then(data => {
                setMovie(data);
                const ids = [];
                data.genres.forEach((genre) => {
                    ids.push(genre.id)
                });
                setIdList(ids.join(","));
                setLoaded(true);
            });
        }
        fetchMovie();
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
                                    <p>{movie.title}</p>
                                </div>
                                <Link to={{pathname: `/movie/${id}/watch`}}>
                                    <button className="playBtn">
                                        <ListItem >
                                            <ListItemText>Play</ListItemText>
                                            <ListItemIcon><PlayCircleOutlineOutlinedIcon sx={{color:"white"}} style={{padding: "0 0 0 1rem"}}/></ListItemIcon>
                                        </ListItem>
                                    </button>
                                </Link>
                                <button className="watchlistBtn" onClick={added ? remove : add}>
                                    <ListItem >
                                        <ListItemText>{added ? "Remove from WatchList" : "Add to WatchList"}</ListItemText>
                                        <ListItemIcon>{added ? <PlaylistRemoveIcon sx={{color: "white"}}/> : <PlaylistAddIcon sx={{color: "white"}}/>}</ListItemIcon>
                                    </ListItem>
                                </button>
                            </div>
                        </div>
                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" style={{width: "100%"}}/>
                    </div>
                    <div className="movieDetails">
                        <h1 className="movieTitle">{movie.title}</h1>
                        <p className="movieOverview">{movie.overview}</p>
                    </div>
                    <Slider genre={{name:"More Like This", id:{idList}, ignore:{id}}} type="movie"></Slider>
                </div>
            </>
        ) : (
            <LoadingScreen />
        )}
    </>
}

export default Movie;