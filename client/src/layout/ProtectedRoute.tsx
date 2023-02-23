import React from "react"
import {Outlet} from "react-router-dom"
const ProtectedRoute: React.FC = () => {
   
    return <div className="flex flex-row">
        <div className="basis-1/5 h-screen shadow-lg shadow-indigo-500/40">
            Sidebar
        </div>
        <div className="basis-4/5 p-12">
            <Outlet />
        </div>
    </div>
}

export default ProtectedRoute
