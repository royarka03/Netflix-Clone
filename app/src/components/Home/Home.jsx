import {React, useState, useMemo} from "react";
import "./home.css";
import Sidebar from "../Sidebar/Sidebar";
import Featured from "./Featured";
import Slider from "../Slider/Slider";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function Home(props) {
    
    const [id, setId] = useState(null);
    const [genres, setGenres] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useMemo(() => {
        setLoaded(false);
        const fetchGenresAndID = async () => {
            let res = await fetch(`https://api.themoviedb.org/3/genre/${props.type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            res.json().then(data => {
                setGenres(data.genres);
            });
            res = await fetch(`https://api.themoviedb.org/3/${props.type}/popular?api_key=${process.env.REACT_APP_API_KEY}`);
            res.json().then(data => {
                setId(Number(data.results[Math.floor((Math.random()*data.results.length))].id));
                setLoaded(true);
            })
        }
        fetchGenresAndID();
    }, [props.type]);
    
    console.log(genres);

    return <>{
        loaded ? (
        <div className="home">
            <Sidebar />
            <div className="main">
                <Featured type={props.type} id={id}/>
                {genres.map((genre, index) => {
                    return <Slider genre={genre} key={index} index={index} type={props.type}></Slider>
                })}
            </div>
        </div>) : (
            <LoadingScreen />
        )
    }
        
    </>
}

export default Home;