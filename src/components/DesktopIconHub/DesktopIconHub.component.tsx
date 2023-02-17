import StdProgramm from "../Programms/StdProgramm.component";
import "./DesktopIconHub.style.scss";
import GoogleChrome from "./DesktopIcons/GoogleChrome.icon";
import {useEffect} from "react";

export default function DesktopIconHub({blueDragMoving}: {blueDragMoving: boolean}){


    useEffect(() => {
        const icons  = document.querySelectorAll(".desktop-icon-container");
        icons.forEach(icon => {
            icon.addEventListener("click", (e) => {
                e.stopPropagation();
                icon.classList.add("desktop-icon-active");
            })
            document.addEventListener("click", () => {
                icon.classList.remove("desktop-icon-active");
            })
            document.addEventListener("mousemove", () => {
                if(!blueDragMoving) return;
                const iconBounding = icon.getBoundingClientRect();
                const blueDrag = document.querySelector(".desktop-blue-drag") as HTMLElement;
                const blueDragBounding = blueDrag.getBoundingClientRect();
                if(!blueDragBounding || blueDragBounding.width === 0) return; 
                if((iconBounding.right > blueDragBounding.left && iconBounding.bottom > blueDragBounding.top)){
                    icon.classList.add("desktop-icon-active");
                }else{
                    icon.classList.remove("desktop-icon-active");
                }
            })
        })
    },[blueDragMoving])

    return(
        <div className="desktop-icon-hub-container">
            <GoogleChrome />
            <StdProgramm />
        </div>
    )
}