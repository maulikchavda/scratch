import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./redux/characterSlice";
import midAreaReducer from "./redux/mindAreaSlice";
import controlReducer from "./redux/controlSlice";

export default configureStore({
  reducer: {
    chars: characterReducer,
    midArea: midAreaReducer,
    control: controlReducer,
  },
});
