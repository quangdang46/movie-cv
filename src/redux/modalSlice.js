import { createSlice } from "@reduxjs/toolkit";
export const modalSlide = createSlice({
  name: "modal",
  initialState: {
    showModal: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { openModal } = modalSlide.actions;
export default modalSlide.reducer;
