import { useEffect, useContext,createContext, useState } from "react"
import "./Desktop.style.scss"
import MainContent from "../components/MainContent/MainContent.component";
import Taskbar from "../components/Taskbar/Taskbar.component";

export const MinimizedContext = createContext<any>(null);
export const OpenedProgrammsContext = createContext<any>(null);
export const VolumeContext = createContext<any>(null);
export default function Desktop({setContentLoaded}: {setContentLoaded: any}) {

    
    const [minimizedProgramms, setMinimizedProgramms] = useState<string[]>([]);
    const [openedProgramms, setOpenedProgramms] = useState<string[]>([]);
    const [volume, setVolume] = useState<number>(0);


    const media = [];
    let loadedContent = 0;

    useEffect(() => {
        if(media.length === 0) setContentLoaded(true);
    },[])


    const loadContent = () => {
        loadedContent++;
        if(loadedContent >= media.length) setContentLoaded(true);        
    }

    


    return(
        <div className="desktop">
            <MinimizedContext.Provider value={{minimizedProgramms: minimizedProgramms, setMinimizedProgramms: setMinimizedProgramms}}>
                <OpenedProgrammsContext.Provider value={{openedProgramms: openedProgramms, setOpenedProgramms: setOpenedProgramms}}>
                    <VolumeContext.Provider value={{volume: volume, setVolume: setVolume}}>
                        <MainContent />
                        <Taskbar />
                    </VolumeContext.Provider>
                </OpenedProgrammsContext.Provider>
            </MinimizedContext.Provider>
        </div>
    )
}
