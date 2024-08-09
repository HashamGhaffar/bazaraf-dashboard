import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../type";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  restaurant: null,
  industry: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    setRestaurant(state, action: PayloadAction<any>) {
      state.restaurant = action.payload;
    },
    setIndustry(state, action: PayloadAction<any>) {
      state.industry = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string | null>) {
      state.refreshToken = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const {
  setUser,
  setRestaurant,
  setIndustry,
  setAccessToken,
  setRefreshToken,
  logoutUser,
} = authSlice.actions;
export default authSlice.reducer;
