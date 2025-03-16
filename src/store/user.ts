import { createSlice } from "@reduxjs/toolkit";
import { UserType, PayloadAction } from "../types/interfaces";

const initialStateArticles: UserType = {
  username: "",
  email: "",
  password: "",
  avatar: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateArticles,
  reducers: {
    changeUser: (state, action: PayloadAction) => {
      if (action.text) state.username = action.text;
    },
    changeEmail: (state, action: PayloadAction) => {
      if (action.text) state.email = action.text;
    },
    changePass: (state, action: PayloadAction) => {
      if (action.text) state.password = action.text;
    },
    changeAvatar: (state, action: PayloadAction) => {
      if (action.text) state.avatar = action.text;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
