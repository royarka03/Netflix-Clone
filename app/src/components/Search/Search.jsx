import React, { useState } from "react";
import "./search.css";
import Sidebar from "../Sidebar/Sidebar";
import SearchIcon from '@mui/icons-material/Search';
import Item from "../Item/Item";

function Search() {

    const [query, setQuery] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        setLoaded(false);
        const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`);
        res.json().then(data => {
            const results = data.results.filter((result) => {
                return result.media_type !== "person";
            })
            setItems(results);
            setLoaded(true);
        })
    }


    return <>
        <Sidebar />
        <div className="main">
            <div className="searchbar">
                <input type="text" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} className="searchquery"/>
                <div className="searchbutton" onClick={fetchItems}>
                    <SearchIcon sx={{fontSize: "3rem"}}/>
                </div>
            </div>
            <div className="searchresults">
                {loaded && <>
                <h2>Search Results</h2>
                <div className="searchresultitems">
                    {items.map((item, index) => {
                        return <Item item={item} key={index} index={index + 1} type={item.media_type}></Item>})}
                </div>
                </>
            }
            </div>
        </div>
    </>
}

export default Search;