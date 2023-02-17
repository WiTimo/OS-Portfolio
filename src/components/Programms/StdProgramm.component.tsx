import "./StdProgramm.style.scss";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import GoogleChromeHeader from "./GoogleChrome/GoogleChromeHeader.component";
import {VscChromeMinimize, VscChromeMaximize, VscClose} from "react-icons/vsc"

export default function StdProgramm(){

    const onDragStart = (e: DraggableEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return(
        <Draggable handle=".std-programm-header" onStart={onDragStart}>
            <div className="std-programm-container">
                <div className="std-programm-header">
                    <GoogleChromeHeader />
                    <div className="std-programm-header-actions">
                        <VscChromeMinimize className="std-programm-icon" />
                        <VscChromeMaximize className="std-programm-icon" />
                        <VscClose className="std-programm-icon" />
                    </div>
                </div>
                <div className="std-programm-content"></div>
            </div>    
        </Draggable>
    )
}