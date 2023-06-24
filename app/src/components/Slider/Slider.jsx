import React, { useEffect, useRef, useState } from "react";
import "./slider.css";
import Item from "../Item/Item";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Slider(props) {

    const listRef = useRef();
    const [index, setIndex] = useState(0);
    const [items, setItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const width = document.body.clientWidth;
    let len = loaded ? items.length : 6;
    console.log(len);
    const slides = Math.floor((width - (window.innerWidth <= 480 ? 50 : 100))/272);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/discover/${props.type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${props.genre.id}`);
            res.json().then(data => {
                setItems(data.results);
                console.log(props.genre.ignore);
                if(props.genre.ignore != null && props.genre.ignore !== undefined) {
                    const titles = [];
                    data.results.forEach((result) => {
                        console.log(result);
                        if(Number(result.id) !== Number(props.genre.ignore.id))
                            titles.push(result);
                    })
                    setItems(titles);
                }
                setLoaded(true);
            });
        }
        fetchItems();
    }, [props.type, props.genre.id, props.genre.ignore]);

    function handleClick(direction) {
        let distance = listRef.current.getBoundingClientRect().x - (window.innerWidth <= 480 ? 50 : 100);
        console.log(distance);
        if(direction === "left" && index !== 0) {
            try {
                document.getElementsByClassName("backIcon")[props.index].classList.add("unclickable");
            }
            catch(err) {
                console.log(err);
            }
            setIndex(index - 1);
            listRef.current.style.transform = `translateX(${distance + 17*16}px)`
            setTimeout(() => {
                try {
                    document.getElementsByClassName("backIcon")[props.index].classList.remove("unclickable");
                }
                catch(err) {
                    console.log(err);
                }
            }, 500);
        }
        if(direction === "right" && index !== len - slides ) {
            try {
                document.getElementsByClassName("forwardIcon")[props.index].classList.add("unclickable");
            }
            catch(err) {
                console.log(err);
            }
            setIndex(index + 1);
            listRef.current.style.transform = `translateX(${distance - 17*16}px)`;
            setTimeout(() => {
                try {
                    document.getElementsByClassName("forwardIcon")[props.index].classList.remove("unclickable");
                }
                catch(err) {
                    console.log(err);
                }
            }, 500);
        }
    }

    return <div className="slider" id={props.index}>
        <h1 style={{fontFamily: "Inter ,sans-serif"}}>{props.genre.name}</h1>
        <div className="wrapper">
            {index !== 0 && <div className="backIcon" onClick={() => handleClick("left")}><ArrowBackIosNewIcon fontSize="large" className="arrowicon" style={{color:"white"}}/></div>}
            <div className="list" ref={listRef}>
                {loaded && items.map((item, index) => {
                    return <Item item={item} key={index} index={index} type={props.type}></Item>
                })}
            </div>
            {index !== len - slides && <div className="forwardIcon" onClick={() => handleClick("right")}><ArrowForwardIosIcon fontSize="large" className="arrowicon" style={{color:"white"}}/></div>}
        </div>
    </div>
}

export default Slider;