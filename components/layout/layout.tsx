import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";
import { SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarProvider, useSidebar } from "../ui/sidebar";
import { Sidebar } from "lucide-react";
import SidebarComponent from "../sidebar/sidebar";

interface LayoutComponentProps {
    children: ReactNode
}

export default function LayoutComponent({children} : LayoutComponentProps) {
    return (
        <>
            <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6"> 
                    {children}
                </div>
                <Toaster />
                    <SidebarProvider style={
                        {
                        "--sidebar-width": "20rem",
                        "--sidebar-width-mobile": "20rem",
                        } as React.CSSProperties
                    }>
                <SidebarComponent />
            </SidebarProvider>
        </>
    )
}