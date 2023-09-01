import {createSlice} from '@reduxjs/toolkit';

interface IAddEmergencyAction {
  payload: number | string;
}

const emergenciesSlice = createSlice({
  name: 'emergencies',
  initialState: [],
  reducers: {
    addEmergency: (state, action: IAddEmergencyAction) => {
      state.push({timestamp: action.payload});
    },
  },
});

export const {addEmergency} = emergenciesSlice.actions;
export default emergenciesSlice.reducer;
