import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  userInfo: {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  } | null;
}

const initialState: UserState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "null")
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime.toString());
    },
    clearUser: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
