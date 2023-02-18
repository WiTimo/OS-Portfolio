import "./TaskbarExtras.style.scss";
import {useState, useEffect, useRef} from "react";
import {ImConnection} from "react-icons/im";
import {RxSpeakerQuiet, RxSpeakerOff, RxSpeakerModerate, RxSpeakerLoud} from "react-icons/rx";
import {MdKeyboardArrowRight, MdNightlight, MdOutlineAccessibilityNew} from "react-icons/md";
import {FiBluetooth, FiHeadphones} from "react-icons/fi";
import {BsFillShieldLockFill} from "react-icons/bs";
import {IoIosAirplane} from "react-icons/io";
import gsap from "gsap";

export default function TaskbarExtras({volume, setVolume}: {volume: number, setVolume: Function}){

    const activeElements = useRef([false, false, false, false, false, false])

    const [miniSettings, setMiniSettings] = useState(false);
    const miniSettingsHub = () => {
        if(miniSettings){
            setMiniSettings(false);
            closeMiniSettings();
        }else{
            setMiniSettings(true);
            openMiniSettings();
        }
    }

    const openMiniSettings = () => {
        const miniSettingsContainer = document.querySelector(".taskbar-mini-settings-container") as HTMLElement;
        gsap.to(miniSettingsContainer, {duration: 0.5, bottom: "7.5vh", ease: "power2.out"})
    }

    const closeMiniSettings = () => {
        const miniSettingsContainer = document.querySelector(".taskbar-mini-settings-container") as HTMLElement;
        gsap.to(miniSettingsContainer, {duration: 0.5, bottom: "-40vh", ease: "power2.out"})
    }

    useEffect(() => {
        document.querySelectorAll(".taskbar-mini-setting").forEach((element, idx) => {
            const newElement = element as HTMLElement;
            if(newElement.classList.contains("taskbar-mini-settings-wlan")) return;
            newElement.addEventListener("click", (e) =>{
                changeAppearance(newElement, idx)
            })
        })
    },[])

    const changeAppearance = (element: HTMLElement, index: number) => {
        const child = element.children[0] as HTMLElement;
        if(activeElements.current[index]){
            activeElements.current[index] = false;
            element.style.background = "";
            child.style.color = "rgba(255,255,255,0.55)";
        }else{
            activeElements.current[index] = true;
            element.style.background = "#6cbcee";
            child.style.color = "black";
        }
    }


    return(
        <div className="taskbar-extra-container">
                <div className="taskbar-extra-container-click" onClick={miniSettingsHub}/>
                <ImConnection className="taskbar-icon taskbar-extra-icon taskbar-internet-icon"/>
                {volume === 0 ?
                    <RxSpeakerOff className="taskbar-icon taskbar-extra-icon"/>: volume > 0 && volume <= 33 ?
                    <RxSpeakerQuiet className="taskbar-icon taskbar-extra-icon"/>: volume > 33 && volume <= 66 ?
                    <RxSpeakerModerate className="taskbar-icon taskbar-extra-icon"/>: volume > 66 && volume <= 100 ?
                    <RxSpeakerLoud className="taskbar-icon taskbar-extra-icon"/>: null}
                <div className="taskbar-mini-settings-container">
                    <div className="taskbar-mini-settings-grid">
                        <div className="taskbar-mini-setting taskbar-mini-settings-wlan">
                            <div className="taskbar-mini-setting-grey-container taskbar-mini-setting-wlan-container">
                                <ImConnection className="taskbar-mini-icon taskbar-mini-wlan-icon" />
                            </div>
                        </div>
                        <div className="taskbar-mini-setting taskbar-mini-settings-bluetooth">
                            <div className="taskbar-mini-setting-grey-container taskbar-mini-setting-bluetooth-container">
                                <FiBluetooth />
                            </div>
                        </div>
                        <div className="taskbar-mini-setting taskbar-mini-settings-vpn">
                            <div className="taskbar-mini-setting-grey-container taskbar-mini-setting-vpn-container">
                                <BsFillShieldLockFill />
                            </div>
                        </div>
                        <div className="taskbar-mini-setting taskbar-mini-setting-bottom taskbar-mini-settings-airplane">
                            <div className="taskbar-mini-setting-grey-container taskbar-mini-setting-airplane-container">
                                <IoIosAirplane />
                            </div>
                        </div>
                        <div className="taskbar-mini-setting taskbar-mini-setting-bottom taskbar-mini-settings-night-mode">
                            <div className="taskbar-mini-setting-grey-container taskbar-mini-setting-night-mode-container">
                                <MdNightlight />
                            </div>
                        </div>
                        <div className="taskbar-mini-setting taskbar-mini-setting-bottom taskbar-mini-settings-accessibility">
                            <div className="taskbar-mini-setting-grey-container taskbar-mini-setting-accessibility-container">
                                <MdOutlineAccessibilityNew />
                            </div>
                        </div>
                    </div>
                    <div className="taskbar-mini-settings-audio">
                        <div className="taskbar-mini-setting-audio-icon-container">
                        {volume === 0 ?
                             <RxSpeakerOff />: volume > 0 && volume <= 33 ?
                             <RxSpeakerQuiet />: volume > 33 && volume <= 66 ?
                             <RxSpeakerModerate />: volume > 66 && volume <= 100 ?
                             <RxSpeakerLoud />: null}
                        </div>
                        <div className="taskbar-mini-setting-audio-range">
                            <input type="range" className="taskbar-mini-setting-audio-range-input" onChange={(e) => setVolume(parseInt(e.target.value))} value={volume}/>
                        </div>
                        <div className="taskbar-mini-setting-audio-earphones">
                            <FiHeadphones />
                        </div>
                    </div>
                </div>
            </div>
    )
}