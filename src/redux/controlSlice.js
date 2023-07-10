import { createSlice } from "@reduxjs/toolkit";
export const controlSlice = createSlice({
  name: "control",
  initialState: {
    repeat: {},
    wait: {},
  },
  reducers: {
    setRepeat: (state, action) => {
      state.repeat = {
        ...state.repeat,
        [action.payload.ele]: action.payload.value,
      };
      return state;
    },
    setWait: (state, action) => {
      state.wait = {
        ...state.wait,
        [action.payload.ele]: action.payload.value,
      };
      return state;
    },
  },
});

// this is for dispatch
export const { setRepeat, setWait } = controlSlice.actions;

// this is for configureStore
export default controlSlice.reducer;
