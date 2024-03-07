import { configureStore } from '@reduxjs/toolkit';
import questionReducer from '../features/questionsSlice';
import { useDispatch } from 'react-redux';

export interface RootState {
  question: ReturnType<typeof questionReducer>;
}

export const store = configureStore({
  reducer: {
    question: questionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
