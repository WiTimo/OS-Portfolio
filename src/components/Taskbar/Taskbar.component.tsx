import "./Taskbar.style.scss";
import {useEffect, useContext} from "react";
import { VolumeContext } from "../../pages/Desktop.page";

//components
import TaskbarContent from "./TaskbarElements/TaskbarContent/TaskbarContent.component";
import TaskbarExtras from "./TaskbarElements/TaskbarExtras/TaskbarExtras.component";
import TaskbarClock from "./TaskbarElements/TaskbarClock/TaskbarClock.component";




export default function Taskbar(){

    const volumeObject = useContext(VolumeContext);
    
    


    
    return(
        <div className="taskbar-container">
            <TaskbarContent />
            <TaskbarExtras volume={volumeObject.volume} setVolume={volumeObject.setVolume} />
            <TaskbarClock />
        </div>
    )
}