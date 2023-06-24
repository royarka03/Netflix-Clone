import React from "react";
import "./Card.css"

function Card(props) {;
    return <div className="card">
        {props.id % 2 === 0 && (<>
                <div className="card-text-div float-left">
                    <p className="card-headings">{props.item.heading}</p>
                    <h3 className="card-text">{props.item.content}</h3>
                </div>
                <div className="card-img-div float-right">
                    <img src={props.item.path} alt="" className="card-img"/>
                </div>
            </>
        )}
        {props.id % 2 === 1 && (
            <>
                <div className="card-text-div float-right">
                    <p className="card-headings">{props.item.heading}</p>
                    <h3 className="card-text">{props.item.content}</h3>
                </div>
                <div className="card-img-div float-left">
                    <img src={props.item.path} alt="" className="card-img"/>
                </div>
            </>
        )}
    </div>
}

export default Card;