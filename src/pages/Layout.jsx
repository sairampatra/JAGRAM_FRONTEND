import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";

function MainLayout() {
  return (
    <div className="relative">
        <LeftSidebar/>
        <Outlet/>
    </div>
  )
}

export default MainLayout