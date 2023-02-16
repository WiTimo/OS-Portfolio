import { useEffect } from "react"
import "./Desktop.style.scss"
import test from "../assets/windowsStartBG.webp"
import MainContent from "../components/MainContent/MainContent.component";
import Taskbar from "../components/Taskbar/Taskbar.component";

export default function Desktop({setContentLoaded}: {setContentLoaded: any}) {

    const media = [];
    let loadedContent = 0;

    useEffect(() => {
        if(media.length === 0) setContentLoaded(true);
    },[])


    const loadContent = () => {
        loadedContent++;
        if(loadedContent >= media.length) setContentLoaded(true);        
    }

    


    return(
        <div className="desktop">
            <MainContent />
            <Taskbar />
        </div>
    )
}