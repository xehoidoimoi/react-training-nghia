import { createSlice } from "@reduxjs/toolkit";

const profilesSlice = createSlice({
    name: 'profiles',
    initialState: {
        profiles: {},
        isFetching: false,
        error: false,
    },
    reducers: {
        // * Get Profile
        getProfilesStart(state) {
            state.isFetching = true;
            state.error = false;
        },
        getProfilesSuccess(state, action) {
            state.profiles = action.payload.profile
            state.isFetching = false;
            state.error = false;
        },
        getProfilesFailure(state) {
            state.isFetching = false;
            state.error = true;
        },

        // * Post Profile
        postProfilesStart(state) {
            state.isFetching = true;
            state.error = false;
        },
        postProfilesSuccess(state, action) {
            state.profiles = action.payload.profile
            state.isFetching = false;
            state.error = false;
        },
        postProfilesFailure(state) {
            state.isFetching = false;
            state.error = true;
        },

        // * Delete Profile
        deleteProfilesStart(state) {
            state.isFetching = true;
            state.error = false;
        },
        deleteProfilesSuccess(state, action) {
            state.profiles = action.payload.profile
            state.isFetching = false;
            state.error = false;
        },
        deleteProfilesFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    getProfilesStart, getProfilesSuccess, getProfilesFailure,
    postProfilesStart, postProfilesSuccess, postProfilesFailure,
    deleteProfilesStart, deleteProfilesSuccess, deleteProfilesFailure
} = profilesSlice.actions;

export default profilesSlice.reducer;