import "./MainContent.style.scss";
import {useState} from "react";

export default function MainContent(){

    const [blueDragMoving, setBlueDragMoving] = useState(false);

    const activateBlueDrag = (e: any) => {
        const blueDrag = document.querySelector(".desktop-blue-drag") as HTMLElement;
        blueDrag.style.left = e.clientX + "px";
        blueDrag.style.top = e.clientY + "px";
        setBlueDragMoving(true);
        
    }

    const moveBlueDrag = (e: any) => {
        if(!blueDragMoving) return;
        const blueDrag = document.querySelector(".desktop-blue-drag") as HTMLElement;
        const blueDragBounding = blueDrag.getBoundingClientRect();
        //blueDrag.style.width = Math.abs(e.clientX - parseInt(blueDrag.getBoundingClientRect().left)) + "px";
        //blueDrag.style.height = Math.abs(e.clientY - parseInt(blueDrag.getBoundingClientRect().top)) + "px";
        if(e.clientX < blueDragBounding.left && e.clientY < blueDragBounding.top){
            blueDrag.style.removeProperty("left")
            blueDrag.style.removeProperty("top")
            if(blueDrag.style.right === "" && blueDrag.style.bottom === ""){
                blueDrag.style.right = window.innerWidth - e.clientX + "px";
                blueDrag.style.bottom = window.innerHeight - e.clientY + "px";
            }
            blueDrag.style.width = window.innerWidth - e.clientX - parseInt(blueDrag.style.right) + "px";
            blueDrag.style.height = window.innerHeight - e.clientY - parseInt(blueDrag.style.bottom) + "px";
            console.log("left up")
            
        }else if(e.clientX > blueDragBounding.left && e.clientY < blueDragBounding.top){
            blueDrag.style.removeProperty("right");
            blueDrag.style.removeProperty("top");
            if(blueDrag.style.left === "" && blueDrag.style.bottom === ""){
                blueDrag.style.left = e.clientX + "px";
                blueDrag.style.bottom = window.innerHeight - e.clientY + "px";
            }
            blueDrag.style.width = e.clientX - parseInt(blueDrag.style.left) + "px";
            blueDrag.style.height = window.innerHeight - e.clientY - parseInt(blueDrag.style.bottom) + "px";
        }
        
    }

    const deactivateBlueDrag = () => {
        setBlueDragMoving(false);
        const blueDrag = document.querySelector(".desktop-blue-drag") as HTMLElement;
        blueDrag.style.width = "0px";
        blueDrag.style.height = "0px";
    }

    return(
        <div className="desktop-main-container" onMouseDown={(e) => activateBlueDrag(e)} onMouseMove={(e) => moveBlueDrag(e)} onMouseUp={deactivateBlueDrag}>
            <div className="desktop-blue-drag" />
        </div>
    )
}