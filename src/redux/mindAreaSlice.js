import { createSlice } from "@reduxjs/toolkit";
export const midAreaSlice = createSlice({
  name: "midArea",
  initialState: {
    midAreaList: [],
  },
  reducers: {
    addList: (state, action) => {
      const tempList = [...state.midAreaList];
      const newListItem = {
        id: `midAreaList-${tempList.length}`,
        comps: [],
      };
      state.midAreaList = [...tempList, newListItem];
      return state;
    },
    updatedList: (state, action) => {
      let index = state.midAreaList.findIndex(
        (x) => x.id === action.payload.id,
      );
      let all_lists = state.midAreaList;
      let [item] = all_lists.splice(index, 1);
      item.comps = action.payload.list;
      all_lists.splice(index, 0, item);
      state.midAreaList = all_lists;
      return state;
    },
    copyListItem: (state, action) => {
      const tempList = [...state.midAreaList];
      const copyElement = tempList.find(
        (list) => list.id === action.payload.id,
      );
      const newListItem = {
        ...copyElement,
        id: `midAreaList-${tempList.length}`,
      };
      state.midAreaList = [...tempList, newListItem];
      return state;
    },
    deleteListItem: (state, action) => {
      const tempList = [...state.midAreaList];
      state.midAreaList = tempList.filter(
        (list) => list.id !== action.payload.id,
      );
      return state;
    },
  },
});

// this is for dispatch
export const { addList, copyListItem, deleteListItem, updatedList } =
  midAreaSlice.actions;

// this is for configureStore
export default midAreaSlice.reducer;
