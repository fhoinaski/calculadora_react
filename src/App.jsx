import { Outlet } from "react-router-dom"
import MobileMenuButton from "./components/Header"
import AuthProvider from "./contexts/AuthProvider"


function App() {
  return (
    <div >
      <MobileMenuButton/>
      <AuthProvider>
      <Outlet/>
      </AuthProvider>
    </div>
  )
}

export default App
