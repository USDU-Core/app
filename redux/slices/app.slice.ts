import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

// App state interface - can be extended for general app state management
interface AppState {
  isLoading: boolean;
  error: string | null;
  notifications: any[];
  lastUpdated: number;
  preferences: {
    theme: 'dark' | 'light';
    currency: string;
    language: string;
  };
}

const initialAppState: AppState = {
  isLoading: false,
  error: null,
  notifications: [],
  lastUpdated: Date.now(),
  preferences: {
    theme: 'dark',
    currency: 'USD',
    language: 'en',
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    // Loading state management
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      state.lastUpdated = Date.now();
    },

    // Error management
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.lastUpdated = Date.now();
    },

    clearError: (state) => {
      state.error = null;
      state.lastUpdated = Date.now();
    },

    // Notifications management
    addNotification: (state, action: PayloadAction<any>) => {
      state.notifications.push({
        ...action.payload,
        id: `notification_${Date.now()}`,
        timestamp: Date.now(),
      });
      state.lastUpdated = Date.now();
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
      state.lastUpdated = Date.now();
    },

    clearAllNotifications: (state) => {
      state.notifications = [];
      state.lastUpdated = Date.now();
    },

    // Preferences management
    updatePreferences: (state, action: PayloadAction<Partial<AppState['preferences']>>) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
      state.lastUpdated = Date.now();
    },

    // Reset app state
    resetAppState: (state) => {
      Object.assign(state, initialAppState);
      state.lastUpdated = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle redux-persist REHYDRATE action
      .addCase(REHYDRATE, (state, action: any) => {
        if (action.payload?.app) {
          const persistedState = action.payload.app;
          
          // Restore persisted state while maintaining structure
          if (persistedState.preferences) {
            state.preferences = persistedState.preferences;
          }
          if (persistedState.notifications) {
            state.notifications = persistedState.notifications;
          }
          
          // Reset loading and error states on app restart
          state.isLoading = false;
          state.error = null;
          state.lastUpdated = Date.now();
        }
      });
  },
});

// Export actions
export const {
  setLoading,
  setError,
  clearError,
  addNotification,
  removeNotification,
  clearAllNotifications,
  updatePreferences,
  resetAppState,
} = appSlice.actions;

export const appReducer = appSlice.reducer;

// Convenience action creators
export const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') =>
  addNotification({ message, type });

export const showError = (message: string) => 
  addNotification({ message, type: 'error' });

export const showSuccess = (message: string) => 
  addNotification({ message, type: 'success' });