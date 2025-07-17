import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  userId: string | null;
  email: string | null;
  username: string | null;
  bio: string | null;
  skill: string[] | null;
  goals: string | null;
  role: string | null;
  industry: string | null;

  setUserData: (
    userId: string | null,
    email: string | null,
    username: string | null,
    bio: string | null,
    skill: string[] | null,
    goals: string | null,
    industry: string | null,
    role: string
  ) => void;
  clearUserData: () => void;
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      userId: null,
      email: null,
      username: null,
      bio: null,
      skill: null,
      goals: null,
      role: null,
      industry: null,
      setUserData: (userId, email, username, bio, skill, goals, industry, role ) =>
        set({ userId, email, username, bio, skill, goals, industry, role }),
      clearUserData: () =>
        set({
          userId: null,
          email: null,
          username: null,
          bio: null,
          skill: null,
          goals: null,
          role: null,
          industry: null,
        }),
    }),
    {
      name: "user-storage",
    }
  )
);
