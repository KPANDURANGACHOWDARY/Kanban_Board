import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null, // { name, email }
  users: [], // List of all registered users (mock DB)
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeAuth: (state) => {
      // Called on client side to load from localStorage
      if (typeof window !== 'undefined') {
        const storedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const loggedInUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        state.users = storedUsers;
        if (loggedInUser) {
          state.isAuthenticated = true;
          state.user = loggedInUser;
        }
      }
    },
    signup: (state, action) => {
      const { name, email, password } = action.payload;
      const newUser = { name, email, password };
      state.users.push(newUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('mockUsers', JSON.stringify(state.users));
      }
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find((u) => u.email === email && u.password === password);
      if (user) {
        state.isAuthenticated = true;
        const safeUser = { name: user.name, email: user.email };
        state.user = safeUser;
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(safeUser));
        }
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('currentUser');
      }
    },
  },
});

export const { initializeAuth, signup, login, logout } = userSlice.actions;
export default userSlice.reducer;
