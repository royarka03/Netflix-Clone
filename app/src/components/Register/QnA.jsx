import {React, useState} from "react";
import "./QnA.css";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

function action(id, setExpanded, expanded) {
    console.log(id);
    console.log(document.getElementById(id));
    document.getElementById(id).classList.toggle("expand");
    setExpanded(!expanded);
}

function QnA(props) {
    const [expanded, setExpanded] = useState(false);
    const id = props.id;
    return <div className="qna">
        <button className="question" onClick={() => {
            action(id, setExpanded, expanded);
        }}>{props.item.question}
            <div className="addIcon">
                {!expanded ? <AddIcon /> : <CloseIcon />}
            </div>
        </button>
        <div className="answer" id={id} >{props.item.answer}</div>
    </div>
}

export default QnA;