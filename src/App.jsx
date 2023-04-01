import { Outlet } from "react-router-dom"
import MobileMenuButton from "./components/MobileMenuButton"


function App() {
  return (
    <div >
      <MobileMenuButton/>
      <Outlet/>
    </div>
  )
}

export default App
