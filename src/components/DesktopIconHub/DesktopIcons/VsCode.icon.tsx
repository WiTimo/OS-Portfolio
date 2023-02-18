import "./DesktopIcons.style.scss";
import VsCode from "../../../assets/VsCodeIcon.png";

export default function VsCodeIcon({openProgramm}: {openProgramm: (programm: string) => void}){

    return(
        <div className="desktop-icon-container desktop-icon-vscode-container" onDoubleClick={() => openProgramm("vscode")}>
            <img src={VsCode} className="desktop-icon dekstop-icon-vscode" />
            <span className="desktop-icon-name desktop-icon-vscode-name">Visual Studio Code</span>
        </div>
    )
}