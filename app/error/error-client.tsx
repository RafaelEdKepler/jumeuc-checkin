"use client"

import { Button } from "@/shared/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ErrorClient() {

    const { replace } = useRouter();

    const handleTryAgain = () => {
        replace('/checkin')
    }

    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-6 px-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-red-100">
            <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>

        <div className="space-y-2">
            <h2 className="text-2xl font-semibold">
            Oh não... algo deu errado 😕
            </h2>

            <p className="text-muted-foreground max-w-md">
            Tivemos um problema ao carregar a lista de presentes.
            Isso pode ser apenas um erro temporário.
            Tente novamente em alguns instantes.
            </p>
        </div>

        <Button onClick={handleTryAgain} className="px-6">
            Tentar novamente
        </Button>
        </div>
    )
}