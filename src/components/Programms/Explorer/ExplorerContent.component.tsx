import "./Explorer.style.scss";
import {AiOutlineHome, AiOutlineArrowRight ,AiOutlineArrowLeft} from "react-icons/ai";
import DesktopIcon from "../../../assets/ExplorerIcons/Desktop.png";
import DownloadIcon from "../../../assets/ExplorerIcons/Download.webp"
import Documents from "../../../assets/ExplorerIcons/Documents.jpg"
import Pictures from "../../../assets/ExplorerIcons/Pictures.png";
import Music from "../../../assets/ExplorerIcons/Music.png";
import Videos from "../../../assets/ExplorerIcons/Videos.jpg";
import { useState } from "react";
import Folder from "./Folder.component";


export default function ExplorerContent(){

    const [defaultFolderStructure, setDefaultFolderStructure] = useState([
        {
            id: 1,
            name: "Desktop",
            type: "folder",
            content: [
                {
                    id: 2,
                    name: "Folder 1",
                    type: "folder",
                    content: [
                        {
                            id: 3,
                            name: "Folder 2",
                            type: "folder",
                            content: [
                                {
                                    id: 4,
                                    name: "file",
                                    type: "folder",
                                    content: []
                                }
                            ]
                        }
                    ]
                }
                ,{
                    id: 5,
                    name: "file",
                    type: "file",
                    content: []
                }
            ]
        }
    ])

    return(
        <div className="explorer-content-container">
            <div className="explorer-content-navigation-container">
                <AiOutlineHome className="explorer-content-navigation-icon"/>
                <AiOutlineArrowLeft className="explorer-content-navigation-icon"/>
                <AiOutlineArrowRight className="explorer-content-navigation-icon"/>
                <input className="explorer-content-navigation-input"/>
            </div>
            <div className="explorer-main-content-container">
                <div className="explorer-content-selection-container">
                    <div className="explorer-content-selection-type explorer-content-selection-desktop">
                        <img src={DesktopIcon} alt="Desktop Icon" className="explorer-content-selection-desktop-icon"/>
                        <div className="explorer-content-selection-desktop-name">Desktop</div>
                    </div>
                    <div className="explorer-content-selection-type exploerer-content-selection-downloads">
                        <img src={DownloadIcon} className="explorer-content-selection-downloads-icon"/>
                        <div className="explorer-content-selection-downloads-name">Downloads</div>
                    </div>
                    <div className="explorer-content-selection-type exploerer-content-selection-documents">
                        <img src={Documents} className="explorer-content-selection-documents-icon"/>
                        <div className="explorer-content-selection-documents-name">Documents</div>
                    </div>
                    <div className="explorer-content-selection-type exploerer-content-selection-pictures">
                        <img src={Pictures} className="explorer-content-selection-pictures-icon"/>
                        <div className="explorer-content-selection-pictures-name">Pictures</div>
                    </div>
                    <div className="explorer-content-selection-type exploerer-content-selection-music">
                        <img src={Music} className="explorer-content-selection-music-icon"/>
                        <div className="explorer-content-selection-music-name">Music</div>
                    </div>
                    <div className="explorer-content-selection-type exploerer-content-selection-videos">
                        <img src={Videos} className="explorer-content-selection-videos-icon"/>
                        <div className="explorer-content-selection-videos-name">Videos</div>
                    </div>
                </div>
                <div className="explorer-content-data-container">
                    <Folder content={defaultFolderStructure}/>
                </div>
            </div>
            
        </div>
    )
}