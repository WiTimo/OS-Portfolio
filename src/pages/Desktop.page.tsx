import { useEffect } from "react"
import "./Desktop.style.scss"
import test from "../assets/windowsStartBG.webp"

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
            <h1>Desktop</h1>
        </div>
    )
}