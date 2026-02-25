import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { HandlePostHumanResources } from "../../redux/Thunks/HRThunk"
import { LogOut } from "lucide-react"

export function HRdashboardSidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            // Dispatch logout action
            await dispatch(HandlePostHumanResources({ apiroute: "LOGOUT" }));
            
            // Clear any local storage/session storage
            localStorage.clear();
            sessionStorage.clear();
            
            // Set a flag to indicate user has logged out
            sessionStorage.setItem('hasLoggedOut', 'true');
            
            // Navigate to home page and replace history
            navigate("/", { replace: true });
            
            // Clear browser history and prevent back navigation
            window.history.replaceState(null, null, "/");
            
        } catch (error) {
            console.error("Logout error:", error);
            // Even if there's an error, clear and navigate
            localStorage.clear();
            sessionStorage.clear();
            sessionStorage.setItem('hasLoggedOut', 'true');
            navigate("/", { replace: true });
            window.history.replaceState(null, null, "/");
        }
    };

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>HR-Dashboard EMS</SidebarGroupLabel> */}
                    <SidebarGroupContent>

                        <SidebarMenu className="gap-3 p-2">


                            <NavLink to={"/HR/dashboard/dashboard-data"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/dashboard.png" alt="" className="w-7 ms-2 my-1" />
                                    <span className="text-[16px]">Dashboard</span>
                                </SidebarMenuItem>

                            </NavLink>


                            <NavLink to={"/HR/dashboard/employees"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/employee-2.png" alt="" className="w-7 ms-2 my-1" />
                                    <span className="text-[16px]">Employees</span>
                                </SidebarMenuItem>

                            </NavLink>



                            <NavLink to={"/HR/dashboard/departments"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">

                                    <img src="/../../src/assets/HR-Dashboard/department.png" alt="" className="w-7 ms-2 my-1" />
                                    <span className="text-[16px]">Departments</span>

                                </SidebarMenuItem>

                            </NavLink>

                            <SidebarMenuItem className="my-1">
                                <SidebarMenuButton className="gap-4">
                                    <img src="/../../src/assets/HR-Dashboard/salary.png" alt="" className="w-7" />
                                    <span className="text-[16px]">Salaries</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem className="my-1">
                                <SidebarMenuButton className="gap-4">
                                    <img src="/../../src/assets/HR-Dashboard/notice.png" alt="" className="w-7" />
                                    <span className="text-[16px]">Issue Notices</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem className="my-1">
                                <SidebarMenuButton className="gap-4">
                                    <img src="/../../src/assets/HR-Dashboard/leave.png" alt="" className="w-7" />
                                    <span className="text-[16px]">Leaves</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem className="my-1">
                                <SidebarMenuButton className="gap-4">
                                    <img src="/../../src/assets/HR-Dashboard/attendance.png" alt="" className="w-7" />
                                    <span className="text-[16px]">Attendances</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem className="my-1">
                                <SidebarMenuButton className="gap-4">
                                    <img src="/../../src/assets/HR-Dashboard/recruitment.png" alt="" className="w-7" />
                                    <span className="text-[16px]">Recruitment</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem className="my-1">
                                <SidebarMenuButton className="gap-4">
                                    <img src="/../../src/assets/HR-Dashboard/interview-insights.png" alt="" className="w-7" />
                                    <span className="text-[16px]">Interview Insights</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem className="my-1">
                                <SidebarMenuButton className="gap-4">
                                    <img src="/../../src/assets/HR-Dashboard/request.png" alt="" className="w-7" />
                                    <span className="text-[16px]">Requests</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem className="my-1">
                                <SidebarMenuButton className="gap-4">
                                    <img src="/../../src/assets/HR-Dashboard/HR-profiles.png" alt="" className="w-7" />
                                    <span className="text-[16px]">HR Profiles</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleLogout} className="hover:bg-red-50 text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300">
                            <LogOut className="w-5 h-5" />
                            <span className="text-[16px] font-medium">Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )

}
