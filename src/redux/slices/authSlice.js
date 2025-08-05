import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers: [],
    userProfile: null,
    isProfileLoading:false
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setIsProfileLoading:(state,action)=>{
      state.isProfileLoading = action.payload
    }
  },
});

export const { setAuthUser, setSuggestedUsers, setUserProfile,setIsProfileLoading } =
  authSlice.actions;
export default authSlice.reducer;
