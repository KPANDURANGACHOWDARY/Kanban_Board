'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { initializeAuth } from './slices/userSlice';
import { initializeTasks } from './slices/taskSlice';
import { initializeTheme } from './slices/uiSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';

// Create a component that connects to Redux and toggles dark mode on the HTML element
function ThemeManager({ children }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    dispatch(initializeTheme());
    dispatch(initializeAuth());
    dispatch(initializeTasks());
  }, [dispatch]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Prevent flash of unstyled content
  return (
    <>
      {children}
      <ToastContainer position="bottom-right" theme={theme} />
    </>
  );
}

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <ThemeManager>{children}</ThemeManager>
    </Provider>
  );
}
