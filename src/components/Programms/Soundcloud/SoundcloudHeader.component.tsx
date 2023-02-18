import "./Soundcloud.style.scss"
import {AiOutlineHome} from "react-icons/ai";

export default function SoundcloudHeader({setInPlaylist}: {setInPlaylist: Function}){
    return(
        <>
        <div className="programm-header-name soundcloud-header-name">Soundcloud<AiOutlineHome className="soundcloud-header-home" onClick={() => setInPlaylist(false)}/></div>
        </>
    )
}