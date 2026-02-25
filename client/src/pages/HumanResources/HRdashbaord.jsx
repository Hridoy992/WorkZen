import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import { HRdashboardSidebar } from "../../components/ui/HRsidebar.jsx"
import { Outlet } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { HandleGetHumanResources } from "../../redux/Thunks/HRThunk.js"

export const HRDashbaord = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const HRState = useSelector((state) => state.HRReducer)
    const pathArray = location.pathname.split("/")

    useEffect(() => {
        // Check authentication when accessing dashboard
        const hasLoggedOut = sessionStorage.getItem('hasLoggedOut');
        
        if (!HRState.isAuthenticated && hasLoggedOut !== 'true') {
            // Try to verify existing session
            dispatch(HandleGetHumanResources({ apiroute: "CHECKLOGIN" }))
        } else if (hasLoggedOut === 'true') {
            // If manually logged out, redirect to home
            navigate("/", { replace: true });
        }
    }, []);

    useEffect(() => {
        // Only navigate if we're exactly on /HR/dashboard
        if (location.pathname === "/HR/dashboard") {
            navigate("/HR/dashboard/dashboard-data")
        }
    }, [location.pathname])

    return (
        <div className="HR-dashboard-container flex">

            <div className="HRDashboard-sidebar">
                <SidebarProvider>
                    <HRdashboardSidebar />
                    <div className="sidebar-container min-[250px]:absolute md:relative">
                        <SidebarTrigger />
                    </div>
                </SidebarProvider>
            </div>
            <div className="HRdashboard-container h-screen w-full min-[250px]:mx-1 md:mx-2 flex flex-col">
                <Outlet />
            </div>
        </div>
    )
}