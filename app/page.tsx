"use client"

import LayoutComponent from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, CalendarPlus, CheckCircle, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Check-in",
    description: "Registrar presença no dia",
    icon: CheckCircle,
    path: "/checkin",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Confirmar Presença",
    description: "Líder - Confirme a presença de quem veio",
    icon: CalendarCheck,
    path: "/confirm",
    color: "from-amber-300 to-yellow-600",
  },
  {
    title: "Registrar Programações",
    description: "Líder - Gerencie os dias de programação",
    icon: CalendarPlus,
    path: "/register",
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Mural",
    description: "Veja quem está presente hoje de um jeito divertido!",
    icon: MessageSquare,
    path: "/wall",
    color: "from-white to-black",
  },
];


export default function Home() {

  const router = useRouter();

  return (
    <LayoutComponent>
      <div className="min-h-screen p-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Painel da JUMEUC
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  onClick={() => router.push(item.path)}
                  className="cursor-pointer border-0 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform bg-transparent p-0"
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
        </div>
      </div>
    </LayoutComponent>
  );
}
