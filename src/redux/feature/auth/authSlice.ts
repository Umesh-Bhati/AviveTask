import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {status: 'UNAUTH'},
  reducers: {
    login: state => {
      state.status = 'AUTH';
    },
    logout: state => {
      state.status = 'UNAUTH';
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
