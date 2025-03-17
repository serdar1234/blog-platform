import { createSlice } from "@reduxjs/toolkit";
import { UserAction, UserType } from "../types/interfaces";

const initialStateUsers: UserType = {
  uname: "",
  email: "",
  avatar: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUsers,
  reducers: {
    addUser: (state, action: UserAction) => {
      if (action.payload) {
        state.uname = action.payload.uname;
        state.email = action.payload.email;
        state.avatar = action.payload.avatar;
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
