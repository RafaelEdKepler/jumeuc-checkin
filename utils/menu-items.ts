import { CalendarCheck, CalendarPlus, CheckCircle, List, MessageSquare, UserCog } from "lucide-react";

export const menuItems = [
  {
    title: "Check-in",
    description: "Registrar presença no dia",
    icon: CheckCircle,
    path: "/checkin",
    color: "from-green-500 to-emerald-600",
    onlyLeader: false,
    onlyMember: false,
  },
  {
    title: "Confirmar Presença",
    description: "Líder - Confirme a presença de quem veio",
    icon: CalendarCheck,
    path: "/confirm",
    color: "from-amber-300 to-yellow-600",
    onlyLeader: true,
    onlyMember: false,
  },
  {
    title: "Registrar Programações",
    description: "Líder - Gerencie os dias de programação",
    icon: CalendarPlus,
    path: "/register",
    color: "from-orange-500 to-red-600",
    onlyLeader: true,
    onlyMember: false,
  },
  {
    title: "Mural",
    description: "Veja quem está presente hoje de um jeito divertido!",
    icon: MessageSquare,
    path: "/wall",
    color: "from-gray-400 to-black",
    onlyLeader: false,
    onlyMember: false,
  },
  {
    title: "Lista dos mais Assíduos",
    description: "Em que posição você está?",
    icon: List,
    path: "/attendance",
    color: "from-cyan-500 to-violet-600",
    onlyLeader: false,
    onlyMember: false,
  },
  {
    title: "Sou líder",
    description: "Se você é líder, entre com a senha para ter acesso as demais funcionalidades!",
    icon: UserCog,
    path: undefined,
    color: "from-red-300 to-orange-300",
    onlyLeader: false,
    onlyMember: true,
  }
];