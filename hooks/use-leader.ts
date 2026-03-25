"use client"

import { create } from "zustand"

type LeaderProp = {
    isLeader: boolean,
    setIsLeader: () => void
}

const leader = localStorage.getItem("@jumeuctche/leader");
const parsedLeader = JSON.parse(leader ? leader : "false");

export const useLeader = create<LeaderProp>((set) => ({
    isLeader: !!parsedLeader,
    setIsLeader: () => set({isLeader : true})
}))