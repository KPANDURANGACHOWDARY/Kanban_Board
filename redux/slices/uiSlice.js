import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light', // 'light' | 'dark'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    initializeTheme: (state) => {
      if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
          state.theme = storedTheme;
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          state.theme = 'dark';
        }
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme);
      }
    },
  },
});

export const { initializeTheme, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
