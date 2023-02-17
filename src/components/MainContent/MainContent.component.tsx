import "./MainContent.style.scss";
import {useState} from "react";
import DesktopIconHub from "../DesktopIconHub/DesktopIconHub.component";

export default function MainContent(){

    const [blueDragMoving, setBlueDragMoving] = useState<boolean>(false);
    const [blueDragBounding, setBlueDragBounding] = useState<number[]>([]);

    const activateBlueDrag = (e: any) => {
        const blueDrag = document.querySelector(".desktop-blue-drag") as HTMLElement;
        blueDrag.style.removeProperty("right");
        blueDrag.style.removeProperty("bottom");
        blueDrag.style.removeProperty("left");
        blueDrag.style.removeProperty("top");
        blueDrag.style.display = "block";
        blueDrag.style.left = e.clientX + "px";
        blueDrag.style.top = e.clientY + "px";
        const blueDragBound = blueDrag.getBoundingClientRect();
        setBlueDragBounding([blueDragBound.top, window.innerWidth - blueDragBound.left, window.innerHeight - blueDragBound.top, blueDragBound.left])
        setBlueDragMoving(true);
        
    }

    const [firstArr, setFirstArr] = useState<boolean[]>([true, true, true, true]);

    const moveBlueDrag = (e: any) => {
        if(!blueDragMoving) return;
        const blueDrag = document.querySelector(".desktop-blue-drag") as HTMLElement;
        if(e.clientX < blueDragBounding[3] && e.clientY < blueDragBounding[0]){
            if(firstArr[0]){
                setFirstArr([false, true, true, true]);
                blueDrag.style.right = blueDragBounding[1] + "px";
                blueDrag.style.bottom = blueDragBounding[2] + "px";
            }
            blueDrag.style.removeProperty("left")
            blueDrag.style.removeProperty("top")
            blueDrag.style.width = window.innerWidth - e.clientX - parseInt(blueDrag.style.right) + "px";
            blueDrag.style.height = window.innerHeight - e.clientY - parseInt(blueDrag.style.bottom) + "px";
        }else if(e.clientX > blueDragBounding[3] && e.clientY < blueDragBounding[0]){
            
            if(firstArr[1]){
                setFirstArr([true, false, true, true]);
                blueDrag.style.left = blueDragBounding[3] + "px";
                blueDrag.style.bottom = blueDragBounding[2] + "px";
            }
            blueDrag.style.removeProperty("right");
            blueDrag.style.removeProperty("top");
            blueDrag.style.width = e.clientX - parseInt(blueDrag.style.left) + "px";
            blueDrag.style.height = window.innerHeight - e.clientY - parseInt(blueDrag.style.bottom) + "px";
        }else if(e.clientX > blueDragBounding[3] && e.clientY > blueDragBounding[0]){
            if(firstArr[2]){
                setFirstArr([true, true, false, true]);
                blueDrag.style.left = blueDragBounding[3] + "px";
                blueDrag.style.top = blueDragBounding[0] + "px";
            }
            blueDrag.style.removeProperty("right");
            blueDrag.style.removeProperty("bottom");
            blueDrag.style.width = e.clientX - parseInt(blueDrag.style.left) + "px";
            blueDrag.style.height = e.clientY - parseInt(blueDrag.style.top) + "px";
        }else if(e.clientX < blueDragBounding[3] && e.clientY > blueDragBounding[0]){
            if(firstArr[3]){
                setFirstArr([true, true, true, false]);
                blueDrag.style.right = blueDragBounding[1] + "px";
                blueDrag.style.top = blueDragBounding[0] + "px";
            }
            blueDrag.style.removeProperty("left");
            blueDrag.style.removeProperty("bottom");
            blueDrag.style.width = window.innerWidth - e.clientX - parseInt(blueDrag.style.right) + "px";
            blueDrag.style.height = e.clientY - parseInt(blueDrag.style.top) + "px";
        }
    }

    const deactivateBlueDrag = () => {
        setBlueDragMoving(false);
        console.log("out")
        const blueDrag = document.querySelector(".desktop-blue-drag") as HTMLElement;
        blueDrag.style.display = "none";
        blueDrag.style.removeProperty("width")
        blueDrag.style.removeProperty("height")
        blueDrag.style.left = window.innerWidth + "px";
        blueDrag.style.top = window.innerHeight + "px";
    }

    return(
        <div className="desktop-main-container" onMouseDown={(e) => activateBlueDrag(e)} onMouseMove={(e) => moveBlueDrag(e)} onMouseUp={deactivateBlueDrag}>
            <div className="desktop-blue-drag" />
            <DesktopIconHub blueDragMoving={blueDragMoving}/>
        </div>
    )
}