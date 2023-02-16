import './App.scss'
import { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage.page'
import Desktop from './pages/Desktop.page'
import gsap from 'gsap'
import MobilePlaceholder from './pages/MobilePlaceholder.page'

export default function App() {

  const [booted, setBooted] = useState<boolean>(false)
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    if(!booted) return;
    const mainDesktop = document.querySelector(".main-desktop") as HTMLElement;
    const mainLoginPage = document.querySelector(".main-login-page") as HTMLElement;
    mainDesktop.style.display = "block";
    mainLoginPage.style.position = "absolute";
    gsap.to(mainDesktop, {duration: 0.75, opacity: "1", ease: "power2.inOut"});
    gsap.to(mainLoginPage, {duration: 0.75, opacity: "0", ease: "power2.inOut"});
    setTimeout(() => {
      mainLoginPage.style.display = "none";
    },750)
  },[booted])

  useEffect(() => {
    window.addEventListener("resize", () => {
      if(window.innerWidth <= 650) setMobile(true);
      else setMobile(false);
    })
  },[])

  return (
    <div className="App">
      {!mobile ? 
      <>
        <div className='main-login-page' style={{opacity: "1", zIndex: "5"}}>
          <LoginPage setBooted={setBooted} contentLoaded={contentLoaded}/>
        </div>
        <div className='main-desktop' style={{display: "none", opacity: "0", zIndex: "10"}}>
          <Desktop setContentLoaded={setContentLoaded}/>
        </div>
      </>  
    : 
    <MobilePlaceholder />
    }
      
    </div>
  )
}
