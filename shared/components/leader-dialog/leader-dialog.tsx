"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useDialog } from "@/shared/hooks/use-dialog";
import PasswordInputComponent from "../password-input/password-input";
import { useLeader } from "@/shared/hooks/use-leader";

export default function LeaderDialog() {
    const [password, setPassword] = useState<string>("");
    const { isOpen, close } = useDialog();
    const { setIsLeader } = useLeader();    

    const handleConfirmPassword = () => {
        if (password === process.env.NEXT_PUBLIC_LEADER_PASSWORD) {
            localStorage.setItem("@jumeuctche/leader", "true");
            setIsLeader();
        }
        handleCloseDialog();
    }

    const handleCloseDialog = () => {
        setPassword("");
        close();
    }

    const handleChangePassword = (password: string) => {
        setPassword(password)
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Informe a senha que foi compartilhada no grupo!
                    </DialogTitle>
                    <PasswordInputComponent
                        setPassword={handleChangePassword}
                        value={password}
                    />
                    <Button onClick={handleConfirmPassword}>Confirmar</Button>
                    <Button variant="destructive" onClick={handleCloseDialog}>Cancelar</Button>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}