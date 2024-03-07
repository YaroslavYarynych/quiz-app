import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from '../helpers/types';

const initialState: InitialState = {
  passedQuestions: null,
  isResult: false,
  currentQuestionId: 1,
  currentReward: 1,
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.passedQuestions = action.payload;
    },

    resetPassedQuestions(state) {
      state.passedQuestions = null;
    },

    setIsResult(state) {
      state.isResult = true;
    },

    resetIsResult(state) {
      state.isResult = false;
    },

    setCurrentQuestionId(state) {
      state.currentQuestionId += 1;
    },

    resetCurentQuestionId(state) {
      state.currentQuestionId = 1;
    },
    setCurrentReward(state) {
      state.currentReward += 1;
    },

    resetCurrentReward(state) {
      state.currentReward = 1;
    },
  },
});

export const {
  setQuestions,
  resetPassedQuestions,
  setIsResult,
  resetIsResult,
  setCurrentQuestionId,
  resetCurentQuestionId,
  setCurrentReward,
  resetCurrentReward,
} = questionsSlice.actions;

export default questionsSlice.reducer;
