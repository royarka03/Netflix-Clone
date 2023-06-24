import React, { useEffect, useState } from "react";
import "./videoplayer.css";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function VideoPlayer() {

    const params = useParams();
    const [loaded, setLoaded] = useState(false);
    const [link, setLink] = useState("");
    const [site, setSite] = useState("");

    useEffect(() => {
        const fetchLink = async () => {
            if(Object.keys(params).length === 1) {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
                res.json().then(data => {
                    if(data.results.length === 0) {
                        setLoaded(true);
                        return;
                    }
                    let siteURL = data.results[0].site === "YouTube" ? "https://www.youtube.com/embed/" : "https://vimeo.com/";
                    setSite(data.results[0].site === "YouTube" ? "YouTube" : "Vimeo");
                    setLink(`${siteURL}${data.results[0].key}`);
                    setLoaded(true);
                })
            } 
            else {
                const res = await fetch(`https://api.themoviedb.org/3/tv/${params.id}/season/${params.sid}/episode/${params.eid}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
                res.json().then(data => {
                    if(data.results.length === 0) {
                        setLoaded(true);
                        return;
                    }
                    let siteURL = data.results[0].site === "YouTube" ? "https://www.youtube.com/embed/" : "https://vimeo.com/";
                    setSite(data.results[0].site === "YouTube" ? "YouTube" : "Vimeo");
                    setLink(`${siteURL}${data.results[0].key}`);
                    setLoaded(true);
                })
            }
        }
        fetchLink();
    }, [params]);

    return <>
    {loaded ? (<>
        <Sidebar></Sidebar>
        <div className="main">
            { site === "YouTube" && <div className="ytplayer">
                <iframe src={link} frameborder="0" allowFullScreen title="video"></iframe>
            </div> }
            <div className="player">
                {site === "Vimeo" && <video controls autoPlay>
                    <source src={link} alt="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
                </video>}
                {site !== "YouTube" && site !== "Vimeo" && <video controls autoPlay>
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"/>
                </video>}
            </div>
        </div>
    </>) : (
        <LoadingScreen />
    )}
    </>
}

export default VideoPlayer;