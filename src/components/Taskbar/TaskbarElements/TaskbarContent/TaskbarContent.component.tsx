import "./TaskbarContent.style.scss";
import windowsLogo from "../../../../assets/windowsLogo.webp";

export default function TaskbarContent(){

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
        <div className="taskbar-content-container">
            <div className="taskbar-content-icons">
                <img className="taskbar-icon taskbar-windows-logo" src={windowsLogo} onClick={(e) => iconClicked("home", e)}/>
            </div>
        </div>
    )
}