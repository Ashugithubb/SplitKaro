'use client'
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import UserReducer from '../slice/user';
// import ApiReducer from '../slice/apiSlice'

export const store = configureStore({
  reducer: {
    //  user: UserReducer,
    //  api:ApiReducer
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// rm -rf splitkaro_backend/.git
