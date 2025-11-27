import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState:{
    isCreateTaskOpen: false,
  },
  reducers:{
    openCreateTask(state){
      state.isCreateTaskOpen = true;
    },
    closeCreateTask(state){
      state.isCreateTaskOpen = false;
    },
    toggleCreateTaslOpen(state){
      state.isCreateTaskOpen = !state.isCreateTaskOpen;
    }

  }
})

export const {openCreateTask,closeCreateTask,toggleCreateTaslOpen} = uiSlice.actions;
export default uiSlice.reducer