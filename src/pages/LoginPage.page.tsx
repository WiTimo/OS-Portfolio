import { ReactInstance, useEffect, useState } from "react";
import "./LoginPage.style.scss";
import {VscDebugRestart} from "react-icons/vsc"
import gsap from "gsap";
import BGImage from "../assets/windowsStartBG.webp"
import {CiUser} from "react-icons/ci"
import {AiOutlineLoading} from "react-icons/ai"
import F11Button from "../assets/f11-button-icon.svg";

export default function LoginPage({setBooted, contentLoaded}: {setBooted: any, contentLoaded: boolean}) {

    const [time,setTime] = useState<string>(new Date().toLocaleTimeString().slice(0,5));
    const [date, setDate] = useState<string>("");
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [loading, setLoading] = useState<boolean>(true);
    const [starting, setStarting] = useState<boolean>(false);
    const [readyToLoad, setReadyToLoad] = useState<boolean>(false);

    const PageTransition = () => {
        document.removeEventListener("pointerdown", PageTransition);
        document.addEventListener("keydown", (e) => PageTransitionBack(e))
        gsap.to(".login-page-section-top", {duration: 0.75, y: "-100%", ease: "power2.inOut"})
        gsap.to(".login-page-background-image", {duration: 0.75, "filter": "blur(10px)", ease: "power2.inOut"})
        gsap.to(".login-page-background-image", {duration: 0.75, scale: 1.1, ease: "power2.inOut"})
        gsap.to(".login-page-section-login", {duration: 0, opacity: "1", delay: 0.35})
        const button = document.querySelector(".login-page-start-button") as HTMLElement;
        button.style.pointerEvents = "all";
    }

    const PageTransitionBack = (e: any) => {
        if(e.key !== "Escape") return;
        const button = document.querySelector(".login-page-start-button") as HTMLElement;
        button.style.pointerEvents = "none";
        document.removeEventListener("keydown", (e) => PageTransitionBack(e))
        document.addEventListener("pointerdown", PageTransition)
        gsap.to(".login-page-section-top", {duration: 0.75, y: "0%", ease: "power2.inOut"})
        gsap.to(".login-page-background-image", {duration: 0.75, "filter": "blur(0px)", ease: "power2.inOut"})
        gsap.to(".login-page-background-image", {duration: 0.75, scale: 1, ease: "power2.inOut"})
        gsap.to(".login-page-section-login", {duration: 0, opacity: "0", delay: 0.35})
        setTimeout(() => {
            setStarting(false)
        },750)
    }

    const reloadPage = () => {
        window.location.reload();
    }

    const startOS = () => {
        setStarting(true)
        setTimeout(() => {
            if(contentLoaded) setBooted(true)
            else setReadyToLoad(true)
        }, 1000)
    }

    useEffect(() => {
        if(readyToLoad) setBooted(true);
    },[contentLoaded])

    useEffect(() => {
        const date = new Date();
        setDate(`${dayArray[date.getDay()]}, ${date.getDate()} ${monthArray[date.getMonth()]}`)
        setInterval(() => {
            setTime(new Date().toLocaleTimeString().slice(0,5))
        },60000)
        document.addEventListener("pointerdown", PageTransition)
    },[])

    return(
        <>

        <div className="booting-container" style={{opacity: loading ? "1" : "0"}}>
            <AiOutlineLoading  className="booting-loading"/>
            <span>Booting</span>
        </div>

        <div className="login-page-container" style={{opacity: loading ? "0" : "1"}}>
            <img src={BGImage} className="login-page-background-image" onLoad={() => setLoading(false)}/>
            <div className="login-page-section-top">
                <span className="login-page-clock">{time}</span>
                <span className="login-page-date">{date}</span>
            </div>
            <div className="login-page-section-bottom">
                <VscDebugRestart className="login-page-power-icon" onClick={reloadPage}/>
            </div>
            <div className="login-page-section-login">
                <div className="login-page-profile-picture-container">
                    <CiUser className="login-page-profile-picture"/>
                </div>
                {starting ? 
                    <span className="login-page-welcome"><AiOutlineLoading className="login-page-welcome-icon"/>Welcome</span>
                : <button className="login-page-start-button" onClick={startOS}>Start</button>                
                }
            </div>
        </div>

        </>
    )
}