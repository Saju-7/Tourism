import Footer from "../../Pages/Footer/Footer"
import Routers from "../../Routers/Routers"

import Header from "../Header/Header"


const Layout = () => {
  return (
    <div style={{overflow:'hidden'}}>
         <Header/>
         <Routers/>
         <Footer/>
    </div>
  )
}

export default Layout