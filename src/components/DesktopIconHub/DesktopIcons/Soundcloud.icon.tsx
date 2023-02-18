import "./DesktopIcons.style.scss";
import SoundCloudIcon from "../../../assets/SoundcloudIcon.png";

export default function SoundcloudIcon({openProgramm}: {openProgramm: (programm: string) => void}){

    return(
        <div className="desktop-icon-container desktop-icon-soundcloud-container" onDoubleClick={() => openProgramm("soundcloud")}>
            <img src={SoundCloudIcon} className="desktop-icon dekstop-icon-soundcloud" />
            <span className="desktop-icon-name desktop-icon-soundcloud-name">Soundcloud</span>
        </div>
    )
}