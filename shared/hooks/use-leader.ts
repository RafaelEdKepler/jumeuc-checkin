"use client"

import { create,  } from "zustand"
import { persist } from "zustand/middleware"
import { STORAGE_KEYS } from "../constants/enums"

type LeaderProp = {
    isLeader: boolean,
    setIsLeader: () => void,
}

export const useLeader = create<LeaderProp>()(
  persist(
    (set) => ({
      isLeader: false,
      setIsLeader: () => set({ isLeader: true })
    }),
    {
      name: STORAGE_KEYS.LEADER
    }
  )
)
