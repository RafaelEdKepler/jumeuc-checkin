"use client"

import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";
import { SidebarProvider } from "../ui/sidebar";
import SidebarComponent from "../sidebar/sidebar";
import LeaderDialog from "../leader-dialog/leader-dialog";

interface LayoutComponentProps {
    children: ReactNode
}

export default function LayoutComponent({children} : LayoutComponentProps) {

    return (
        <>
            <div className="bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
                    {children}
                </div>
                <Toaster />
                    <SidebarProvider defaultOpen={false} style={
                        {
                        "--sidebar-width": "20rem",
                        "--sidebar-width-mobile": "20rem",
                        } as React.CSSProperties
                    }>
                <SidebarComponent />
                <LeaderDialog />
            </SidebarProvider>
        </>
    )
}