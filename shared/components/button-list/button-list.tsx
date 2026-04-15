"use client"

import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { menuItems } from "@/shared/utils/menu-items";
import { useDialog } from "@/shared/hooks/use-dialog";
import { useLeader } from "@/shared/hooks/use-leader";

export default function ButtonListComponent() {
    
    const router = useRouter();
    const { open } = useDialog();
    const { isLeader } = useLeader();

    const handleButtonClick = (url: string | undefined) => {
        if (url) {
            router.push(url);
            return;
        }
        open();
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {menuItems
                .filter(item => {
                    if (item.onlyLeader) return isLeader;
                    if (item.onlyMember) return !isLeader;
                    return true;
                })
                .map((item) => {
                    const Icon = item.icon;

                    return (
                        <Card
                            key={item.title}
                            onClick={() => handleButtonClick(item.path)}
                            className="cursor-pointer border-0 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform bg-transparent p-0 select-none"
                        >
                            <CardContent
                                className={`bg-gradient-to-br ${item.color} text-white p-6 h-full flex flex-col justify-between`}
                            >
                                <div className="flex justify-between items-start">
                                    <Icon size={32} />
                                </div>

                                <div className="mt-6">
                                    <h2 className="text-xl font-semibold">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm opacity-90 mt-1">
                                        {item.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
        </div>
    )
}