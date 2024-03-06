import { createSlice,} from "@reduxjs/toolkit";
import { RootState} from '@/store/store';

const initialState = {
  isAuthenticated:false,
  accessToken:'',
  userType:'',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload.access_token,
        userType: action.payload.user_type,
      };
    },
    logout: (state) => {
      return {
        ...state,
         isAuthenticated: false,
         accessToken: '',
         userType: '',
       };
    },
  },
});
export const { login, logout } = userSlice.actions;
export const selectUserType = (state:RootState) => state.user.userType;
export default userSlice.reducer;