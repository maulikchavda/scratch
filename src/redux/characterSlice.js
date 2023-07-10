import { createSlice } from "@reduxjs/toolkit";
export const characterSlice = createSlice({
  name: "chars",
  initialState: {
    characters: [{ id: "sprite-0", angle: 0, moveX: 0, moveY: 0 }],
    activeCharacter: "sprite-0",
  },
  reducers: {
    setMovementX: (state, action) => {
      let tempCharacters = [...state.characters];
      tempCharacters = tempCharacters.map((char) =>
        char.id === action.payload.id
          ? { ...char, moveX: char.moveX + action.payload.value }
          : char,
      );
      state.characters = tempCharacters;
      return state;
    },
    setMovementY: (state, action) => {
      let tempCharacters = [...state.characters];
      tempCharacters = tempCharacters.map((char) =>
        char.id === action.payload.id
          ? { ...char, moveY: char.moveY + action.payload.value }
          : char,
      );
      state.characters = tempCharacters;
      return state;
    },
    setRotate: (state, action) => {
      let tempCharacters = [...state.characters];
      tempCharacters = tempCharacters.map((char) =>
        char.id === action.payload.id
          ? { ...char, angle: char.angle + action.payload.value }
          : char,
      );
      state.characters = tempCharacters;
      return state;
    },
    setActiveChar: (state, action) => {
      state.activeCharacter = action.payload.id;
      return state;
    },
    addCharacters: (state, action) => {
      const newCharacter = {
        id: `sprite-${state.characters.length}`,
        angle: 0,
        moveX: 0,
        moveY: 0,
      };
      state.characters = [...state.characters, newCharacter];
      return state;
    },
    cloneCharacter: (state, action) => {
      const activeCharacter = state.characters.find(
        (char) => char.id === action.payload.id,
      );
      const newCharacter = {
        ...activeCharacter,
        id: `sprite-${state.characters.length}`,
      };
      state.characters = [...state.characters, newCharacter];
      return state;
    },
    deleteCharacter: (state, action) => {
      console.log("ACTION", action.payload);
      let tempCharacters = [...state.characters];
      tempCharacters = tempCharacters.filter(
        (char) => char.id !== action.payload.id,
      );

      state.characters = tempCharacters;
      state.activeCharacter = tempCharacters[tempCharacters.length - 1].id;
      return state;
    },
  },
});

// this is for dispatch
export const {
  setMovementX,
  setMovementY,
  setRotate,
  addCharacters,
  setActiveChar,
  cloneCharacter,
  deleteCharacter,
} = characterSlice.actions;

// this is for configureStore
export default characterSlice.reducer;
