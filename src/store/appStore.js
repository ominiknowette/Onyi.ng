import { create } from "zustand";

export const useAppStore = create((set) => ({
  currentSchool: null,
  currentCourses: [],
  waitlistCount: 312,
  setCurrentSchool: (school) => set({ currentSchool: school }),
  setCurrentCourses: (courses) => set({ currentCourses: courses }),
  incrementWaitlistCount: () =>
    set((state) => ({ waitlistCount: state.waitlistCount + 1 })),
}));

