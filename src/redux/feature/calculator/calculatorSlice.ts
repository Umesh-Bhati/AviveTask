import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  inputVal: '',
  calculatedVal: 0,
};

const calculatorSlice = createSlice({
  initialState,
  name: 'calculator',
  reducers: {
    addtion: (state, action) => {
      state.calculatedVal = state.calculatedVal + action.payload;
    },
    subtract: (state, action) => {
      state.calculatedVal = state.calculatedVal - action.payload;
    },
    updateInputVal: (state, action) => {
      state.inputVal += action.payload;
    },
    clearAll: () => initialState,
    clearOne: state => {
      state.inputVal = state.inputVal.slice(0, -1);
    },
    calculateResult: state => {
      state.calculatedVal = eval(state.inputVal);
    },
  },
});

export const {
  addtion,
  subtract,
  updateInputVal,
  clearAll,
  clearOne,
  calculateResult,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
