"use client"

import { useDialog } from "@/hooks/use-dialog";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "../ui/sidebar";

import { menuItems } from "@/utils/menu-items";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLeader } from "@/hooks/use-leader";

export default function SidebarComponent() {

    const { open, setOpen, toggleSidebar, isMobile } = useSidebar();
    const isLeader = useLeader((state) => state.isLeader);
    const { open : openDialog } = useDialog();
    const pathname = usePathname();
    const router = useRouter();

    const handleSidebarClick = (url: string | undefined) => {
        setOpen(false);
        if (url) {
            router.push(url);
            return;
        }
        openDialog();
    }

    return (
        <>
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-muted transition">
                    <Image
                        alt="logo da jumeuc"
                        src="/logo_juve_correto.png"
                        width={30}
                        height={30}
                    />
                </button>
            </div>

            <Sidebar collapsible="icon" className="z-40">
                <SidebarHeader>
                    <SidebarContent
                        onClick={toggleSidebar}
                        className="cursor-pointer"
                    >
                        <Image
                            alt="logo da jumeuc"
                            src="/logo_juve_correto.png"
                            width={30}
                            height={30}
                        />
                    </SidebarContent>

                    <SidebarMenu hidden={!isMobile && !open ? true : false}>
                        <SidebarMenuItem>

                            <SidebarMenuButton
                                variant="outline"
                                onClick={() => handleSidebarClick("/")}
                                className="flex items-center justify-center cursor-pointer"
                                tooltip="Volte para o menu inicial"
                                isActive={pathname === "/"}
                            >
                                Início
                            </SidebarMenuButton>
                                {menuItems.filter(item => {
                                    if (item.onlyLeader) return isLeader;
                                    if (item.onlyMember) return !isLeader;
                                    return true;
                                })
                                .map((menuItem) => {
                                    return (
                                        <SidebarMenuButton
                                            key={menuItem.title}
                                            onClick={() => handleSidebarClick(menuItem.path)}
                                            tooltip={menuItem.description}
                                            variant="outline"
                                            className="flex items-center justify-center cursor-pointer"
                                            isActive={pathname === menuItem.path}
                                        >
                                            {menuItem.title}
                                        </SidebarMenuButton>
                                )})}
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
            </Sidebar>
        </>
    )
}