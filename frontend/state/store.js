// Placeholder for frontend/state/store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  code: {
    jsx: '',
    css: '',
  },
  chatHistory: [],
  currentSession: null,

  setCode: (newCode) => set({ code: newCode }),
  setChatHistory: (chatHistory) => set({ chatHistory }),
  setCurrentSession: (session) => set({ currentSession: session }),
}));

export default useStore;
