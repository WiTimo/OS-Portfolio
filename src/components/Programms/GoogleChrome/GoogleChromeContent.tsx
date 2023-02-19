import "./GoogleChrome.style.scss";
import {AiOutlineHome, AiOutlineArrowRight ,AiOutlineArrowLeft} from "react-icons/ai";
import {useState, useEffect, useContext} from "react";
import {IoReloadOutline} from "react-icons/io5";
import {VolumeContext} from "../../../pages/Desktop.page";

export default function GoogleChromeContent({StdinputValue = "https://www.google.com/search?igu=1"}: {StdinputValue?: string}){

    const [inputValue, setInputValue] = useState<string>(StdinputValue);
    const [searchValue, setSearchValue] = useState<string>("");
    const volumeObject = useContext(VolumeContext);

    const changeHandler = (e: any) => {
        setInputValue(e.target.value);
    }

    const searchWeb = (e: any) => {
        if(e.key === "Enter" || e === undefined){
        if(inputValue === "https://www.google.com/" || 
        inputValue === "https://www.google.com" || 
        inputValue === "google.com" || 
        inputValue === "www.google.com" ||
        inputValue === "https://google.com"){
            setInputValue("https://www.google.com/search?igu=1");
            setSearchValue("https://www.google.com/search?igu=1");
        }else{
            if(!inputValue.includes("https://")){
                setSearchValue("https://" + inputValue);
                setInputValue("https://" + inputValue);
            }else{
                setSearchValue(inputValue);
            }
            const input = document.querySelector(".google-input") as HTMLElement;
            input.blur();
        }
    }
}

    useEffect(() => {
        if(searchValue !== ""){
            document.querySelector(".google-frame")?.setAttribute("src", searchValue);
            document.querySelector(".google-input")?.setAttribute("value", searchValue);
        }
    },[searchValue])

    const reloadPage = () => {
        document.querySelector(".google-frame")?.setAttribute("src", inputValue);
    }

    const goToGooglePage = () => {
        document.querySelector(".google-frame")?.setAttribute("src", "https://www.google.com/search?igu=1");
        setInputValue("https://www.google.com/search?igu=1");
        document.querySelector(".google-input")?.setAttribute("value", "https://www.google.com/search?igu=1");
        setSearchValue("https://www.google.com/search?igu=1")
        setInputValue("https://www.google.com/search?igu=1");
    }
    
    const goBack = () => {
        document.querySelector(".google-frame")?.setAttribute("src", "https://www.google.com/search?igu=1");
        setInputValue("https://www.google.com/search?igu=1");
        document.querySelector(".google-input")?.setAttribute("value", "https://www.google.com/search?igu=1");
    }



    return(
        <>
            <div className="google-input-container">
                <div className="google-input-action-container">
                    <AiOutlineArrowLeft className="google-action-button google-input-backwards" onClick={goBack}/>
                    <IoReloadOutline className="google-action-button google-input-reload" onClick={reloadPage}/>
                </div>
                <input className="google-input" onChange={(e) => changeHandler(e)} value={inputValue} onKeyDown={(e) => searchWeb(e)}/>
                <AiOutlineHome className="google-input-button google-input-home-button" onClick={goToGooglePage}/>
            </div>
            <div className="google-frame-container">
                <iframe className="google-frame" src={StdinputValue} frameBorder="none"/>
            </div>
        </>
    )
}