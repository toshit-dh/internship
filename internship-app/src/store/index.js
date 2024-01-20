import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;

export const selectUserId = (state) => state.user.userId;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
