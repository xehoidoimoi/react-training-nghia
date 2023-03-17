import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    isFetching: false,
    error: false
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        //* Register
        registerStart(state) {
            state.isFetching = true;
            state.error = false;
        },
        registerSuccess: (state) => {
            state.isFetching = false;
            state.error = false;
        },
        registerFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
        //* Login
        loginStart(state) {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        loginFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
        logout(state) {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
        },
        // * Update
        userUpdatedStart(state) {
            state.isFetching = true;
        },
        userUpdatedSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        userUpdatedFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
    }
});
export const { registerStart, registerSuccess, registerFailure,
    loginStart, loginSuccess, loginFailure, logout,
    userUpdatedStart, userUpdatedSuccess, userUpdatedFailure,
} = userSlice.actions;
export default userSlice.reducer;