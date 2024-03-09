import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'loggedIn',
  initialState: {
    value: false,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
