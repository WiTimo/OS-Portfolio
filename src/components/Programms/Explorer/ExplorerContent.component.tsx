import "./Explorer.style.scss";
import { AiOutlineHome, AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import DesktopIcon from "../../../assets/ExplorerIcons/Desktop.png";
import DownloadIcon from "../../../assets/ExplorerIcons/Download.webp"
import Documents from "../../../assets/ExplorerIcons/Documents.jpg"
import Pictures from "../../../assets/ExplorerIcons/Pictures.png";
import Music from "../../../assets/ExplorerIcons/Music.png";
import Videos from "../../../assets/ExplorerIcons/Videos.jpg";
import { useState, useRef, useEffect } from "react";
import Folder from "./Folder.component";

interface stdObject{
    id: number;
    name: string;
    type: string;
    content: stdObject[];
}

export default function ExplorerContent() {

    const [currentFolderId, setCurrentFolderId] = useState<number>(1);
    const [maxiumumFolderId, setMaxiumumFolderId] = useState<number>(5);
    const [currentFolder, setCurrentFolder] = useState<stdObject>({
        id: 0,
        name: "none",
        type: "none",
        content: []
    });
    const [defaultFolderStructure_Desktop, setDefaultFolderStructure_Desktop] = useState<Object[]>([
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
                , {
                    id: 5,
                    name: "file",
                    type: "folder",
                    content: []
                }
            ]
        }
    ]
)

    const [currentFolderStructure, setCurrentFolderStructure] = useState<Object[]>(defaultFolderStructure_Desktop)

    const getParentFolder = (folder: stdObject, folderStructure: any) => {
        if (folderStructure.find((item: any) => item.id === folder.id)) {
            return folderStructure;
        }
        for (let i of folderStructure) {
            if (i.content.length > 0) {
                const parentFolder: any = getParentFolder(folder, i.content);
                if (parentFolder) {
                    return parentFolder;
                }
            }
        }
      }

    const setCurrentFolderFunc = (structure: any, id: number, inputValue: stdObject | undefined = undefined) => {
        const folder = structure.find((item: any) => item.id === id);
        if (folder) {
            if (inputValue) {
                const parentFolder = getParentFolder(folder, structure);
                if(parentFolder[0].id === 1) console.log(parentFolder[0].content);
                parentFolder[0].content.push(inputValue);
                setCurrentFolderStructure([...currentFolderStructure]);
            }
            setCurrentFolder(folder);
            setCurrentFolderId(folder.id);
            return;
        }
        for (let i of structure) {
            if (i.content.length > 0) {
                setCurrentFolderFunc(i.content, id)
            }
        }
    }

    const addItem = (type: string) => {
        const newItem: stdObject = {
            id: maxiumumFolderId + 1,
            name: `new ${type}`,
            type: `${type.toLowerCase()}`,
            content: []
        }
        setMaxiumumFolderId(newItem.id);
        setCurrentFolderFunc(currentFolderStructure, currentFolderId, newItem);
    }

    return (
        <div className="explorer-content-container">
            <div className="explorer-content-navigation-container">
                <AiOutlineHome className="explorer-content-navigation-icon" />
                <AiOutlineArrowLeft className="explorer-content-navigation-icon" />
                <AiOutlineArrowRight className="explorer-content-navigation-icon" />
                <input className="explorer-content-navigation-input" />
            </div>
            <div className="explorer-main-content-container">
                <div className="explorer-content-selection-container">
                    <div className="explorer-content-selection-type explorer-content-selection-desktop">
                        <img src={DesktopIcon} alt="Desktop Icon" className="explorer-content-selection-desktop-icon" />
                        <div className="explorer-content-selection-desktop-name">Desktop</div>
                    </div>
                    <div className="explorer-content-selection-type exploerer-content-selection-downloads">
                        <img src={DownloadIcon} className="explorer-content-selection-downloads-icon" />
                        <div className="explorer-content-selection-downloads-name">Downloads</div>
                    </div>
                    <div className="explorer-content-selection-type exploerer-content-selection-documents">
                        <img src={Documents} className="explorer-content-selection-documents-icon" />
                        <div className="explorer-content-selection-documents-name">Documents</div>
                    </div>
                    <div className="explorer-content-selection-type exploerer-content-selection-pictures">
                        <img src={Pictures} className="explorer-content-selection-pictures-icon" />
                        <div className="explorer-content-selection-pictures-name">Pictures</div>
                    </div>
                    <div className="explorer-content-selection-type exploerer-content-selection-music">
                        <img src={Music} className="explorer-content-selection-music-icon" />
                        <div className="explorer-content-selection-music-name">Music</div>
                    </div>
                    <div className="explorer-content-selection-type exploerer-content-selection-videos">
                        <img src={Videos} className="explorer-content-selection-videos-icon" />
                        <div className="explorer-content-selection-videos-name">Videos</div>
                    </div>
                </div>
                <div className="explorer-content-data-header">
                        <button onClick={() => addItem("Folder")}>Create</button>
                        <button>Delete</button>
                    </div>
                <div className="explorer-content-data-container">
                    
                    <Folder content={defaultFolderStructure_Desktop} />
                </div>
            </div>

        </div>
    )
}