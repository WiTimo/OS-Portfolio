import "./StdProgramm.style.scss";
import Draggable, { DraggableEvent } from "react-draggable";
import GoogleChromeHeader from "./GoogleChrome/GoogleChromeHeader.component";
import {VscChromeMinimize, VscChromeMaximize, VscClose} from "react-icons/vsc"
import GoogleChromeContent from "./GoogleChrome/GoogleChromeContent";
import gsap from "gsap";
import { useContext, useEffect, useState, useCallback } from "react";
import { MinimizedContext } from "../../pages/Desktop.page";
import SoundcloudContent from "./Soundcloud/SoundcloudContent.component";
import SoundcloudHeader from "./Soundcloud/SoundcloudHeader.component";
import WebStructContent from "./WebStruct/WebstructContent.component";
import WebStructHeader from "./WebStruct/WebstructHeader.component";
import VsCodeContent from "./VsCode/VsCodeContent.component";
import VsCodeHeader from "./VsCode/VsCodeHeader.component";
import ExplorerContent from "./Explorer/ExplorerContent.component";
import ExplorerHeader from "./Explorer/ExplorerHeader.component";

export default function StdProgramm({openedProgramms, setOpenedProgramms} : {openedProgramms: string[], setOpenedProgramms: Function}){

    const minimizedArray = useContext(MinimizedContext);

    const onDragStart = (e: DraggableEvent, name: string) => {
        e.preventDefault();
        e.stopPropagation();
        highlightProgramm(name);
    }

    const closeProgramm = (name: string, e: any) => {
        e.stopPropagation();
        e.preventDefault();
        const programmContainer = document.querySelector(`.std-${name}-container`) as HTMLElement;
        programmContainer.style.animation = "fadeOut 0.25s ease-in-out forwards"
        const icon = document.querySelector(`.taskbar-${name}-icon`) as HTMLElement;
        icon.style.animation = "jumpOut 0.25s ease-in-out forwards"
        setTimeout(() => {
            setOpenedProgramms(openedProgramms.filter((programm) => programm !== name));
        icon.style.removeProperty("animation");
        }, 250);

    }

    const minimizeProgramm = (name: string, e:any) => {
        e.stopPropagation();
        e.preventDefault();
        const programmContainer = document.querySelector(`.std-${name}-container`) as HTMLElement;
        programmContainer.classList.remove("std-programm-container-maximized");
        gsap.to(programmContainer, {duration: 0.25, scale: 0, ease: "power2.inOut"});
        gsap.to(programmContainer, {duration: 0.45, bottom: "-100%", ease: "power2.inOut"});

        setTimeout(() => {
            if(minimizedArray.minimizedProgramms.includes(name)) return;
            minimizedArray.setMinimizedProgramms([...minimizedArray.minimizedProgramms, name]);
        },450)
    }

    const maximizeProgramm = (name: string, e:any) => {
        e.stopPropagation();
        e.preventDefault();
        const programmContainer = document.querySelector(`.std-${name}-container`) as HTMLElement;
        if(programmContainer.classList.contains("std-programm-container-maximized")){
            programmContainer.classList.remove("std-programm-container-maximized");
            return;
        }
        programmContainer.classList.add("std-programm-container-maximized");
        programmContainer.style.removeProperty("transform");
    }
    
    const highlightProgramm = (name: string) => {
        const programmContainer = document.querySelector(`.std-${name}-container`) as HTMLElement;
        const allProgrammContainer = document.querySelectorAll(".std-programm-container") as NodeListOf<HTMLElement>;
        allProgrammContainer.forEach((container) => {
            container.style.zIndex = "1";
        });
        programmContainer.addEventListener("click", () => {
            allProgrammContainer.forEach((container) => {
                container.style.zIndex = "1";
            });
            programmContainer.style.zIndex = "5";
        });
        programmContainer.classList.remove("std-programm-container-maximized");
        programmContainer.style.zIndex = "5";
    }
    

    //Soundcloud
    const [inPlaylist, setInPlaylist] = useState<boolean>(false);


    //Resize
    const capturePointerDown = (e: any, name: string) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.setPointerCapture(e.pointerId);
        const programmContainer = document.querySelector(`.std-${name}-container`) as HTMLElement;
        const styles = window.getComputedStyle(programmContainer);
        programmContainer.style.width = styles.width;
        programmContainer.style.height = styles.height;
        programmContainer.style.transition = "none";
    };

    const capturePointerMove = (e: any, name: string, movement: string) => {
        if(!e.target.hasPointerCapture(e.pointerId)) return;
        const container = document.querySelector(`.std-${name}-container`) as HTMLElement;
        switch(movement){
            case "right": {
                container.style.width = `${e.clientX - container.getBoundingClientRect().left}px`;
                break;
            }
            case "bottom": {
                container.style.height = `${e.clientY - container.getBoundingClientRect().top}px`; 
                break;
            }
            case "right-corner": {
                container.style.width = `${e.clientX - container.getBoundingClientRect().left}px`;
                container.style.height = `${e.clientY - container.getBoundingClientRect().top}px`;
                break;
            }
        
        }
    }

    const capturePointerUp = (e: any, name: string) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.releasePointerCapture(e.pointerId);
        const programmContainer = document.querySelector(`.std-${name}-container`) as HTMLElement;
        programmContainer.style.transition = "height 250ms, width 250ms";
    };

    const [resizeSize, setResizeSize] = useState<Object>({width: 200, height: 200});

    const ResizeHandler = (e: any, direction: any, ref: any, delta: any) => {
        setResizeSize({
            width: ref.width,
            height: ref.height,
        });
    }

    return(
        <>
       {openedProgramms.map((name) => {
            return(
                <Draggable handle=".std-programm-handle" onStart={(e) => onDragStart(e, name)} key={name}>
                    <div className={`std-programm-container std-${name}-container`} onLoad={() => highlightProgramm(name)}>
                        <div className="std-programm-header">
                            <div className="std-programm-handle" />
                            {name === "googleChrome" ? <GoogleChromeHeader />:
                            name === "soundcloud" ? <SoundcloudHeader setInPlaylist={setInPlaylist}/>:
                            name === "webstruct" ? <WebStructHeader />:
                            name === "vscode" ? <VsCodeHeader />:
                            name === "explorer" ? <ExplorerHeader />:
                            <></>}
                            
                            <div className="std-programm-header-actions">
                                <VscChromeMinimize className="std-programm-icon" onClick={(e) => minimizeProgramm(name, e)}/>
                                <VscChromeMaximize className="std-programm-icon" onClick={(e) => maximizeProgramm(name, e)}/>
                                <VscClose className="std-programm-icon" onClick={(e) => closeProgramm(name, e)}/>
                            </div>
                        </div>
                        <div className="std-programm-content">
                            {name === "googleChrome" ? <GoogleChromeContent />:
                            name === "soundcloud" ? <SoundcloudContent inPlaylist={inPlaylist} setInPlaylist={setInPlaylist}/>:
                            name === "webstruct" ? <WebStructContent />:
                            name === "vscode" ? <VsCodeContent />:
                            name === "explorer" ? <ExplorerContent />:
                             <></>}
                        </div>
                        <div className={`std-programm-resize std-programm-resize-right`} 
                        onPointerDown={(e) => capturePointerDown(e, name)}
                        onPointerUp={(e) => capturePointerUp(e, name)}
                        onPointerMove={(e) => capturePointerMove(e, name, "right")}/>
                        <div className={`std-programm-resize std-programm-resize-bottom`}
                        onPointerDown={(e) => capturePointerDown(e, name)}
                        onPointerUp={(e) => capturePointerUp(e, name)}
                        onPointerMove={(e) => capturePointerMove(e, name, "bottom")} />
                        <div className={`std-programm-resize std-programm-resize-corner`}
                        onPointerDown={(e) => capturePointerDown(e, name)}
                        onPointerUp={(e) => capturePointerUp(e, name)}
                        onPointerMove={(e) => capturePointerMove(e, name, "right-corner")} />
                    </div>    
                </Draggable>
            )
        })}
        </>
    )
}