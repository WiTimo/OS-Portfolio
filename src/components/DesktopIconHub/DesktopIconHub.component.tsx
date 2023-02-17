import StdProgramm from "../Programms/StdProgramm.component";
import "./DesktopIconHub.style.scss";
import GoogleChromeIcon from "./DesktopIcons/GoogleChrome.icon";
import {useEffect, useState} from "react";

export default function DesktopIconHub({blueDragMoving}: {blueDragMoving: boolean}){

    const [openedProgramms, setOpenedProgramms] = useState<string[]>([]);

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

    const openProgramm = (programm: string) => {
        switch(programm){
            case "googleChrome": {
                if(openedProgramms.includes("googleChrome")) return;
                setOpenedProgramms([...openedProgramms, "googleChrome"]);
            }
        }
    }

    return(
        <div className="desktop-icon-hub-container">
            <GoogleChromeIcon openProgramm={openProgramm}/>
            <StdProgramm openedProgramms={openedProgramms} setOpenedProgramms={setOpenedProgramms} />
        </div>
    )
}