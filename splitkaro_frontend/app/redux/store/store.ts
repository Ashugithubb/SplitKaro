'use client'
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import UserReducer from '../slice/auth.slice';
import ApiReducer from '../slice/image.slice'
import ProfileReducer from '../slice/user.slice'

export const store = configureStore({
  reducer: {
     user: UserReducer,
     api:ApiReducer,
     profile:ProfileReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;





// rm -rf splitkaro_backend/.git
