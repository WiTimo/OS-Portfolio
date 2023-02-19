import "./Explorer.style.scss";
import {useState} from "react";
import FolderIcon from "../../../assets/ExplorerIcons/Folder.png";
import FileIcon from "../../../assets/ExplorerIcons/File.png"

export default function Folder({content}: {content: any}){
    const [renderContent, setRenderContent] = useState<boolean>(false);
    const [emptyFolder, setEmptyFolder] = useState<boolean>(false);


    const renderContentHandler = (item: any) => {
        if(item.content.length > 0){
            setRenderContent(true)
        }
        else if(item.content.length === 0 && item.type === "folder"){
            setEmptyFolder(true);
        }
        else return;
    }


        return(
            content.map((item: any) => {
                    if(renderContent)return <Folder content={item.content} key={item.id}/>
                    if(!emptyFolder)
                    return(
                        <div className="explorer-folder-container" onDoubleClick={() => renderContentHandler(item)} key={item.id}>
                            {item.type === "folder" ?
                            <img src={FolderIcon} alt="folder-icon" className="explorer-render-icon explorer-folder-icon"/>    
                            : <img src={FileIcon} alt="file-icon" className="explorer-render-icon explorer-file-icon"/>
                            }
                            <span>{item.name}</span>
                        </div>
                    )
                    else return(
                        <div className="explorer-empty-foler" key={item.id} >
                            <p>Folder is empty</p>
                        </div>
                    )
            
            })
        )
}