import "./StdProgramm.style.scss";
import Draggable, { DraggableEvent } from "react-draggable";
import GoogleChromeHeader from "./GoogleChrome/GoogleChromeHeader.component";
import {VscChromeMinimize, VscChromeMaximize, VscClose} from "react-icons/vsc"
import GoogleChromeContent from "./GoogleChrome/GoogleChromeContent";
import gsap from "gsap";

export default function StdProgramm({openedProgramms, setOpenedProgramms} : {openedProgramms: string[], setOpenedProgramms: Function}){


    const onDragStart = (e: DraggableEvent, name: string) => {
        e.preventDefault();
        e.stopPropagation();
        const programmContainer = document.querySelector(`.std-${name}-container`) as HTMLElement;
        programmContainer.classList.remove("std-programm-container-maximized");
    }

    const closeProgramm = (name: string) => {
        const programmContainer = document.querySelector(`.std-${name}-container`) as HTMLElement;
        gsap.to(programmContainer, {duration: 0.25, scale: 0.9, ease: "power2.inOut"});
        gsap.to(programmContainer, {duration: 0.25, opacity: 0, ease: "power2.inOut"});
        setTimeout(() => {
            setOpenedProgramms(openedProgramms.filter((programm) => programm !== name));
        }, 250);
    }

    const minimizeProgramm = (name: string) => {
        const programmContainer = document.querySelector(`.std-${name}-container`) as HTMLElement;
        programmContainer.classList.remove("std-programm-container-maximized");
        gsap.to(programmContainer, {duration: 0.25, scale: 0, ease: "power2.inOut"});
        gsap.to(programmContainer, {duration: 0.45, bottom: "-100%", ease: "power2.inOut"});
    }

    const maximizeProgramm = (name: string) => {
        const programmContainer = document.querySelector(`.std-${name}-container`) as HTMLElement;
        programmContainer.classList.add("std-programm-container-maximized");
        programmContainer.style.removeProperty("transform");
    }


    return(
        <>
       {openedProgramms.map((name) => {
            return(
                <Draggable handle=".std-programm-header" onStart={(e) => onDragStart(e, name)} key={name}>
                    <div className={`std-programm-container std-${name}-container`}>
                        <div className="std-programm-header">
                            <GoogleChromeHeader />
                            <div className="std-programm-header-actions">
                                <VscChromeMinimize className="std-programm-icon" onClick={() => minimizeProgramm(name)}/>
                                <VscChromeMaximize className="std-programm-icon" onClick={() => maximizeProgramm(name)}/>
                                <VscClose className="std-programm-icon" onClick={() => closeProgramm(name)}/>
                            </div>
                        </div>
                        <div className="std-programm-content">
                            <GoogleChromeContent />
                        </div>
                    </div>    
                </Draggable>
            )
        })}
        </>
    )
}