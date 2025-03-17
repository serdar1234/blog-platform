import { createSlice } from "@reduxjs/toolkit";
import { UserAction, UserRequiredFields } from "../types/interfaces";

const initialStateUsers: UserRequiredFields = {
  uname: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUsers,
  reducers: {
    addUser: (state, action: UserAction) => {
      if (action.payload) {
        state.uname = action.payload.uname;
        state.email = action.payload.email;
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
