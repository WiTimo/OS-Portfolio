import StdProgramm from "../Programms/StdProgramm.component";
import "./DesktopIconHub.style.scss";
import GoogleChromeIcon from "./DesktopIcons/GoogleChrome.icon";
import {useEffect, useState, useContext} from "react";
import { OpenedProgrammsContext } from "../../pages/Desktop.page";
import SoundcloudIcon from "./DesktopIcons/Soundcloud.icon";
import WebstructIcon from "./DesktopIcons/WebStruct.icon";
import VsCodeIcon from "./DesktopIcons/VsCode.icon";

export default function DesktopIconHub({blueDragMoving}: {blueDragMoving: boolean}){

    const openedProgrammsObject = useContext(OpenedProgrammsContext);

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
        if(openedProgrammsObject.openedProgramms.includes(programm)) return;
        openedProgrammsObject.setOpenedProgramms([...openedProgrammsObject.openedProgramms, programm]);
    }

    return(
        <div className="desktop-icon-hub-container">
            <GoogleChromeIcon openProgramm={openProgramm}/>
            <SoundcloudIcon openProgramm={openProgramm}/>
            <WebstructIcon openProgramm={openProgramm}/>
            <VsCodeIcon openProgramm={openProgramm}/>
            <StdProgramm openedProgramms={openedProgrammsObject.openedProgramms} setOpenedProgramms={openedProgrammsObject.setOpenedProgramms} />
        </div>
    )
}