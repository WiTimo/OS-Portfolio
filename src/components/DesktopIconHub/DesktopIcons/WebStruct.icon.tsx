import "./DesktopIcons.style.scss";
import WebStruct from "../../../assets/WebstructIcon.png";

export default function WebstructIcon({openProgramm}: {openProgramm: (programm: string) => void}){

    return(
        <div className="desktop-icon-container desktop-icon-webstruct-container" onDoubleClick={() => openProgramm("webstruct")}>
            <img src={WebStruct} className="desktop-icon dekstop-icon-webstruct" />
            <span className="desktop-icon-name desktop-icon-webstruct-name">WebStruct</span>
        </div>
    )
}