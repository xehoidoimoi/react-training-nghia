import { createSlice } from "@reduxjs/toolkit";

export const newArticlesSlice = createSlice({
    name: "newArticles",
    initialState: {
        newArticles: [],
        isFetching: false,
        error: false
    },
    reducers: {
        // * Get newArticles
        getNewArticlesStart(state) {
            // state.newArticles = [];
            state.isFetching = true;
            state.error = false;
        },
        getNewArticlesSuccess(state, action) {
            // state.newArticles = action.payload.newArticles;
            state.isFetching = false;
            state.error = false;
        },
        getNewArticlesFailure(state) {
            // state.newArticles = [];
            state.isFetching = false;
            state.error = true;
        },
        // * Post newArticles
        postNewArticlesStart(state) {
            // state.newArticles = [];
            state.isFetching = true;
            state.error = false;
        },
        postNewArticlesSuccess(state, action) {
            state.newArticles.push(action.payload);
            state.isFetching = false;
            state.error = false;
        },
        postNewArticlesFailure(state) {
            // state.newArticles = [];
            state.isFetching = false;
            state.error = true;
        },
        // * Delete newArticles
        deleteNewArticlesStart(state) {
            // state.newArticles = [];
            state.isFetching = true;
            state.error = false;
        },
        deleteNewArticlesSuccess(state, action) {
            // state.newArticles = state.newArticles.filter((comment) => comment.id !== action.payload);
            state.isFetching = false;
            state.error = false;
        },
        deleteNewArticlesFailure(state) {
            // state.newArticles = [];
            state.isFetching = false;
            state.error = true;
        },
        // * Update newArticles
        updateNewArticlesStart(state) {
            // state.newArticles = [];
            state.isFetching = true;
            state.error = false;
        },
        updateNewArticlesSuccess(state, action) {
            // state.newArticles = state.newArticles.filter((comment) => comment.id !== action.payload);
            state.isFetching = false;
            state.error = false;
        },
        updateNewArticlesFailure(state) {
            // state.newArticles = [];
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    getNewArticlesStart, getNewArticlesSuccess, getNewArticlesFailure,
    postNewArticlesStart, postNewArticlesSuccess, postNewArticlesFailure,
    deleteNewArticlesStart, deleteNewArticlesSuccess, deleteNewArticlesFailure,
    updateNewArticlesStart, updateNewArticlesSuccess, updateNewArticlesFailure,
} = newArticlesSlice.actions;

export default newArticlesSlice.reducer;