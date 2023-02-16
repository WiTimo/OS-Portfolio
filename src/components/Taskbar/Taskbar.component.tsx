import "./Taskbar.style.scss";
import {useState, useEffect, useRef} from "react";


//components
import TaskbarContent from "./TaskbarElements/TaskbarContent/TaskbarContent.component";
import TaskbarExtras from "./TaskbarElements/TaskbarExtras/TaskbarExtras.component";
import TaskbarClock from "./TaskbarElements/TaskbarClock/TaskbarClock.component";




export default function Taskbar(){

    
    const [volume, setVolume] = useState<number>(0);

    
    return(
        <div className="taskbar-container">
            <TaskbarContent />
            <TaskbarExtras volume={volume} setVolume={setVolume} />
            <TaskbarClock />
        </div>
    )
}