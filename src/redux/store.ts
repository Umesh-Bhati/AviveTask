import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from './feature/auth/authSlice';
import emergencySlice from './feature/emergency/emergencySlice';

const rootReducer = combineReducers({
  auth: authSlice,
  emergencyList: emergencySlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
