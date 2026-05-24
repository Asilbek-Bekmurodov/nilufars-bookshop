import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCredinttials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { getCredinttials } = authSlice.actions;
export default authSlice.reducer;
