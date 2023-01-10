import { createSlice } from "@reduxjs/toolkit";

let initialValue = JSON.parse(window.localStorage.getItem("list"));

export const listSlice = createSlice({
  name: "list",
  initialState: { value: initialValue === null ? [] : initialValue },
  reducers: {
    addItem: (state, action) => {
      //write code for adding a item in todo
      state.value.push(action.payload);
      window.localStorage.setItem("list", JSON.stringify(state.value));
      console.log(JSON.parse(window.localStorage.getItem("list")));
    },
    deleteItem: (state, action) => {
      state.value = state.value.filter((i) => i.id !== action.payload.id);
      window.localStorage.setItem("list", JSON.stringify(state.value));
    },

    checkItem: (state, action) => {
      state.value.splice(action.payload.id, 1, {
        id: action.payload.id,
        todo: action.payload.todo,
        checked: action.payload.checked
      });
      
      window.localStorage.setItem("list", JSON.stringify(state.value));
    },
  },
});

export const { addItem, deleteItem, checkItem } = listSlice.actions;

export default listSlice.reducer;
