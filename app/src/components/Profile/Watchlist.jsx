import React from "react";
import "./watchlist.css";
import WatchlistItem from "./WatchlistItem";

function Watchlist(props) {
    return <>
        <h1>WatchList</h1>
        <div className="watchlist-items">
            {console.log(props.list)}
            {props.list.length !== 0 ? props.list.map((item) => {
                return <WatchlistItem item={item}/>
            }): <p>You don't have any items in your watchlist.</p>}
        </div>
    </>
}

export default Watchlist;