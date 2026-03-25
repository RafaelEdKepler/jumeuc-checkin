"use client"

import { useState } from "react"
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { PasswordInput } from "./types";

export default function PasswordInputComponent({ setPassword, value } : PasswordInput) {
    
    const [show, setShow] = useState<boolean>(false);
    
    return (
        <div className="relative">
            <Input
                type={show ? "text" : "password"}
                className="pr-10"
                placeholder="Digite a senha"
                value={value}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="button"
                onClick={() => setShow(prev => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    )
}