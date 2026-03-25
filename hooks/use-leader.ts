import { create } from "zustand"

type LeaderProp = {
    isLeader: boolean,
    setIsLeader: () => void
}

export const useLeader = create<LeaderProp>((set) => ({
    isLeader: false,
    setIsLeader: () => set({isLeader : true})
}))