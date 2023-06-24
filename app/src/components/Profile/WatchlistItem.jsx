import React from "react";
import "./watchlistitem.css";
import { Link, useNavigate } from "react-router-dom";
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

function WatchlistItem(props) {

    const navigate = useNavigate();

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
                navigate(0);
            }
        });
    }

    return <div className="watchlist-item-wrapper">
    <Link to={{pathname: `/${props.item.type}/${props.item.id}`}} className="text-link">
            <div className="watchlist-item" 
            style={{backgroundImage: props.item.img != null && `url(https://image.tmdb.org/t/p/original${props.item.img})`}}>
            </div>
        </Link>
        <div className="watchlist-item-footer">
            <p>{props.item.title}</p>
            <div className="add-remove-watchlist">
                <PlaylistRemoveIcon onClick={remove}/>
            </div>
        </div>
    </div>
}

export default WatchlistItem;