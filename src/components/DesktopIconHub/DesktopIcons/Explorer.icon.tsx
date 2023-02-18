import "./DesktopIcons.style.scss";
import Explorer from "../../../assets/ExplorerIcon.png";

export default function ExplorerIcon({openProgramm}: {openProgramm: (programm: string) => void}){

    return(
        <div className="desktop-icon-container desktop-icon-explorer-container" onDoubleClick={() => openProgramm("explorer")}>
            <img src={Explorer} className="desktop-icon dekstop-icon-explorer" />
            <span className="desktop-icon-name desktop-icon-explorer-name">Explorer</span>
        </div>
    )
}