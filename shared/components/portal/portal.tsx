"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom"

export default function Portal() {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded-lg p-6 animate-pulse">
                <Image src="/jumeuc_logo.png" alt="Logo da JUMEUC" className="rounded-lg" width={200} height={200} />
            </div>
        </div>,
        modalRoot
    )
}