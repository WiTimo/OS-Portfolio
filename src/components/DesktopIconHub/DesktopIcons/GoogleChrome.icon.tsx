import "./DesktopIcons.style.scss";
import GoogleChromeIcon from "../../../assets/GoogleChromeIcon.png";

export default function GoogleChrome(){
    return(
        <div className="desktop-icon-container desktop-icon-google-chrome-container">
            <img src={GoogleChromeIcon} className="desktop-icon dekstop-icon-google-chrome" />
            <span className="desktop-icon-name desktop-icon-google-chrome-name">Google Chrome</span>
        </div>
    )
}