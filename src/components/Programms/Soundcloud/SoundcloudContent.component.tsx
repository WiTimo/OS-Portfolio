import "./Soundcloud.style.scss"
import {useState} from "react";
import HipHop from "../../../assets/SoundcloudPictures/HipHop.png";
import ChillNation from "../../../assets/SoundcloudPictures/chillNation.png";
import TrapCity from "../../../assets/SoundcloudPictures/Trapcity.webp";
import TrapNation from "../../../assets/SoundcloudPictures/TrapNation.jpg";
import Romantic from "../../../assets/SoundcloudPictures/Romantic.png";
import Classic from "../../../assets/SoundcloudPictures/Classic.jpg";
import Rock from "../../../assets/SoundcloudPictures/Rock.png";
import Electronic from "../../../assets/SoundcloudPictures/Electronic.png";
import Metal from "../../../assets/SoundcloudPictures/Metal.png";

export default function SoundcloudContent({inPlaylist, setInPlaylist}: {inPlaylist: boolean, setInPlaylist: Function}){

    const [playlistUrl, setPlaylistUrl] = useState<string>("");

    const changePlaylistHandler = (index: number) => {
        console.log("changePlaylistHandler")
        setInPlaylist(true);
        switch(index){
            case 1: setPlaylistUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/380154338&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"); break;
            case 2: setPlaylistUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/321956822&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"); break;
            case 3: setPlaylistUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/347583195&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"); break;
            case 4: setPlaylistUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/384547178&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"); break;
            case 5: setPlaylistUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/119184966&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"); break;
            case 6: setPlaylistUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/600989253&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"); break;
            case 7: setPlaylistUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1096792681&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"); break;
            case 8: setPlaylistUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1454264305&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"); break;
            case 9: setPlaylistUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/225153781&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"); break;
        }
        
    }
    

    return(
        <div className="soundcloud-content-container">
            {inPlaylist  && playlistUrl !== "" ? 
            <iframe className="soundcloud-playlist-frame" src={playlistUrl} frameBorder="none"/>
            : 
            <div className="soundcloud-content-select-container">
                <div className="soundcloud-content-select soundcloud-content-select-1" onClick={() => changePlaylistHandler(1)}>
                    <img src={HipHop}/>
                </div>
                <div className="soundcloud-content-select soundcloud-content-select-2" onClick={() => changePlaylistHandler(2)}>
                    <img src={ChillNation}/>
                </div>
                <div className="soundcloud-content-select soundcloud-content-select-3" onClick={() => changePlaylistHandler(3)}>
                    <img src={TrapCity}/>
                </div>
                <div className="soundcloud-content-select soundcloud-content-select-4" onClick={() => changePlaylistHandler(4)}>
                    <img src={TrapNation}/>
                </div>
                <div className="soundcloud-content-select soundcloud-content-select-5" onClick={() => changePlaylistHandler(5)}>
                    <img src={Romantic}/>
                </div>
                <div className="soundcloud-content-select soundcloud-content-select-6" onClick={() => changePlaylistHandler(6)}>
                    <img src={Classic}/>
                </div>
                <div className="soundcloud-content-select soundcloud-content-select-7" onClick={() => changePlaylistHandler(7)}>
                    <img src={Rock}/>
                </div>
                <div className="soundcloud-content-select soundcloud-content-select-8" onClick={() => changePlaylistHandler(8)}>
                    <img src={Electronic}/>
                </div>
                <div className="soundcloud-content-select soundcloud-content-select-9" onClick={() => changePlaylistHandler(9)}>
                    <img src={Metal}/>
                </div>
            </div>}
        </div>
    )
}