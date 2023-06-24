import React, { useEffect, useState } from "react";
import "./item.css";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Link } from "react-router-dom";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

function Item(props) {
    
    const [added, setAdded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchAdded = async () => {
            const cookies = document.cookie;
            let uid = cookies.split('; ').find((cookie) => {
                return cookie.startsWith('uid=')
            }).split('=')[1];
            fetch(`${process.env.REACT_APP_BASE_URL}/watchlist/check`, {
                method: "POST",
                body: JSON.stringify({
                    itemId: props.item.id,
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
                    setAdded(data.found);
                }
            });
        }
        fetchAdded();
    }, [props.item.id]);

    function add() {
        const cookies = document.cookie;
        let uid = cookies.split('; ').find((cookie) => {
            return cookie.startsWith('uid=')
        }).split('=')[1];
        fetch(`${process.env.REACT_APP_BASE_URL}/watchlist/add`, {
            method: "POST",
            body: JSON.stringify({
                itemId: props.item.id,
                userId: uid,
                imgPath: props.item.poster_path,
                type: props.type,
                title: props.type === 'movie' ? props.item.title : props.item.name
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
        fetch(`${process.env.REACT_APP_BASE_URL}/watchlist/remove`, {
            method: "POST",
            body: JSON.stringify({
                itemId: props.item.id,
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
    
    return <div className="item-wrapper">
        <Link to={{pathname: `/${props.type}/${props.item.id}`}} className="text-link">
            <div className={props.index === 0 ? "item first" : "item"} 
            style={{backgroundImage: props.item.backdrop_path != null && (isHovered ? `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(36,33,33,0.3) 22%, rgba(0,0,0,0.8) 83%), url(https://image.tmdb.org/t/p/original${props.item.backdrop_path})` : `url(https://image.tmdb.org/t/p/original${props.item.backdrop_path})`)}} 
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                {isHovered && (
                    <div className="hoverItem">
                        <h3 className="title">{props.type === 'movie' ? props.item.title : props.item.name}</h3>
                        <p style={{fontSize: "0.6rem"}}>{
                            props.item.overview.length > 100 ? props.item.overview.slice(0, 100) + "..." : props.item.overview
                        }</p>
                        <div className="watchBtn">
                            <PlayArrowRoundedIcon />
                            <span>Watch</span>
                        </div>
                    </div>
                )}
            </div>
        </Link>
        <div className="item-footer">
            <p>{props.type === 'movie' ? props.item.title : props.item.name}</p>
            <div className="add-remove-watchlist">
                {!added && <><PlaylistAddIcon onClick={add}/></>}
                {added && <><PlaylistRemoveIcon onClick={remove}/></>}
            </div>
        </div>
    </div>
}

export default Item;
