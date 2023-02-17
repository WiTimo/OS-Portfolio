import "./DesktopIcons.style.scss";
import GoogleChromeIconPng from "../../../assets/GoogleChromeIcon.png";

export default function GoogleChromeIcon({openProgramm}: {openProgramm: (programm: string) => void}){

    return(
        <div className="desktop-icon-container desktop-icon-google-chrome-container" onDoubleClick={() => openProgramm("googleChrome")}>
            <img src={GoogleChromeIconPng} className="desktop-icon dekstop-icon-google-chrome" />
            <span className="desktop-icon-name desktop-icon-google-chrome-name">Google Chrome</span>
        </div>
    )
}