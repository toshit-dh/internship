import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";
import { getDataRoute } from "../utils/api-routes";
const initialState = {
  userId: null,
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  },
});

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().user.userId;
      const response = await axios.get(`${getDataRoute}${userId.user}`, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const { setUserId, setUserData } = userSlice.actions;
export const selectUserId = (state) => state.user.userId;
export const selectUserData = (state) => state.user.userData;
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
