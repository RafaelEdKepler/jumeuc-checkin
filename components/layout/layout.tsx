import { ReactNode } from "react";

interface LayoutComponentProps {
    children: ReactNode
}

export default function LayoutComponent({children} : LayoutComponentProps) {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6"> 
            {children}
        </div>
    )
}