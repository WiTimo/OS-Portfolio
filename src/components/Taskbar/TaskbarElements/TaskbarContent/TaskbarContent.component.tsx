import "./TaskbarContent.style.scss";
import windowsLogo from "../../../../assets/windowsLogo.webp";
import { useContext } from "react";
import { MinimizedContext } from "../../../../pages/Desktop.page"
import googleChromeLogo from "../../../../assets/GoogleChromeIcon.png";
import soundcloudLogo from "../../../../assets/SoundcloudIcon.png";
import webStructLogo from "../../../../assets/WebStructIcon.png";
import VsCodeLogo from "../../../../assets/VsCodeIcon.png";
import explorerLogo from "../../../../assets/ExplorerIcon.png";
import gsap from "gsap"
import { OpenedProgrammsContext } from "../../../../pages/Desktop.page";

export default function TaskbarContent(){

    const minimizedArray = useContext(MinimizedContext);
    const openedProgrammsOptions = useContext(OpenedProgrammsContext);

    const iconClicked = (icon: string, e: any) => {
        let element = document.querySelector(`.taskbar-${icon}-icon`) as HTMLElement;
        if(!element) element = e.target as HTMLElement;
        element.style.animation = "taskbar-icon-click 0.4s ease-out";
        setTimeout(() => {
            element.style.animation = "";
        },400)
        const allProgramms = document.querySelectorAll(".std-programm-container") as NodeListOf<HTMLElement>;
        allProgramms.forEach(programm => {
            programm.style.zIndex = "1";
        })
        const currentProgramm = document.querySelector(`.std-${icon}-container`) as HTMLElement;
        if(currentProgramm) currentProgramm.style.zIndex = "5";

        switch(icon){
            case "home": {
                console.log("home");
                break;
            }
            default: {
                showProgramm(icon);
                break;
            }
        }
    }

    const showProgramm = (programm: string) => {
        const miniProgramms = [...minimizedArray.minimizedProgramms];
        miniProgramms.splice(miniProgramms.indexOf(programm), 1);
        minimizedArray.setMinimizedProgramms(miniProgramms);
        const programmContainer = document.querySelector(`.std-${programm}-container`) as HTMLElement;
        gsap.to(programmContainer, {duration: 0.25, scale: 1, ease: "power2.inOut"});
        if(programmContainer.style.bottom)
            gsap.to(programmContainer, {duration: 0.45, bottom: "15%", ease: "power2.inOut"});
        else
            gsap.to(programmContainer, {duration: 0.45, top: "7%", ease: "power2.inOut"});
    }

    return(
        <div className="taskbar-content-container">
            <div className="taskbar-content-icons">
                <img className="taskbar-icon taskbar-windows-logo" src={windowsLogo} onClick={(e) => iconClicked("home", e)}/>
                {openedProgrammsOptions.openedProgramms.map((programm: string) => {
                    let activeProgramm = "";
                    switch(programm){
                        case "googleChrome": {
                            activeProgramm = googleChromeLogo;
                            break;
                        }
                        case "soundcloud": {
                            activeProgramm = soundcloudLogo;
                            break;
                        }
                        case "webstruct": {
                            activeProgramm = webStructLogo;
                            break;
                        }
                        case "vscode": {
                            activeProgramm = VsCodeLogo;
                            break;
                        }
                        case "explorer": {
                            activeProgramm = explorerLogo;
                            break;
                        }
                    }
                    const minArray = [...minimizedArray.minimizedProgramms];
                    return(
                        <div className={`taskbar-icon taskbar-programm-icon taskbar-${programm}-icon 
                        ${minArray.includes(programm) ? `taskbar-programm-icon-minimized` : ""} taskbar-${programm}-logo`}
                         onClick={(e) => iconClicked(programm, e)} key={programm} >
                            <img src={activeProgramm} key={programm} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}