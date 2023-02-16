import "./Taskbar.style.scss";
import {useState, useEffect} from "react";
import windowsLogo from "../../assets/windowsLogo.webp";

export default function Taskbar(){

    const [time, setTime] = useState(new Date().toTimeString().slice(0,5));
    const generalDate = new Date();
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const date = `${generalDate.getDate()}.${generalDate.getMonth().toString().length === 1 ? "0"+(generalDate.getMonth()+1): (generalDate.getMonth()+1)}.${generalDate.getFullYear()}`
    const hoverDate = `${dayArray[generalDate.getDay()]}, ${generalDate.getDate()} ${monthArray[generalDate.getMonth()]} ${generalDate.getFullYear()}`


    useEffect(() => {
        setInterval(() => {
            setTime(new Date().toTimeString().slice(0,5));
        }, 60000);
    },[])

    const showHoverDate = () => {
        const hoverText = document.querySelector(".taskbar-hover-text") as HTMLElement;
        hoverText.style.opacity = "1";
        
    }

    const hideHoverDate = () => {
        const hoverText = document.querySelector(".taskbar-hover-text") as HTMLElement;
        hoverText.style.opacity = "0";
    }

    const iconClicked = (icon: string, e: any) => {
        const element = e.target as HTMLElement;
        element.style.animation = "taskbar-icon-click 0.4s ease-out";
        setTimeout(() => {
            element.style.animation = "";
        },400)

        switch(icon){
            case "home": {
                console.log("home")
            }
        }
    }

    return(
        <div className="taskbar-container">
            <div className="taskbar-content-container">
                <div className="taskbar-content-icons">
                    <img className="taskbar-icon taskbar-windows-logo" src={windowsLogo} onClick={(e) => iconClicked("home", e)}/>
                </div>
            </div>
            <div className="taskbar-clock-container" onPointerEnter={showHoverDate} onPointerLeave={hideHoverDate}>
                <span>{time}</span> 
                <span>{date}</span>
                <div className="taskbar-hover-text">{hoverDate}</div>
            </div>
        </div>
    )
}