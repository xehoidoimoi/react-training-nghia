import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        comments: [],
        isFetching: false,
        error: false
    },
    reducers: {
        // * Get Comments
        getCommentsStart(state) {
            // state.comments = [];
            state.isFetching = true;
            state.error = false;
        },
        getCommentsSuccess(state, action) {
            state.comments = action.payload.comments;
            state.isFetching = false;
            state.error = false;
        },
        getCommentsFailure(state) {
            // state.comments = [];
            state.isFetching = false;
            state.error = true;
        },
        // * Post Comments
        postCommentsStart(state) {
            // state.comments = [];
            state.isFetching = true;
            state.error = false;
        },
        postCommentsSuccess(state, action) {
            state.comments.push(action.payload.comment);
            state.isFetching = false;
            state.error = false;
        },
        postCommentsFailure(state) {
            // state.comments = [];
            state.isFetching = false;
            state.error = true;
        },
        // * Delete Comments
        deleteCommentsStart(state) {
            // state.comments = [];
            state.isFetching = true;
            state.error = false;
        },
        deleteCommentsSuccess(state, action) {
            state.comments = state.comments.filter((comment) => comment.id !== action.payload);
            state.isFetching = false;
            state.error = false;
        },
        deleteCommentsFailure(state) {
            // state.comments = [];
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    getCommentsStart, getCommentsSuccess, getCommentsFailure,
    postCommentsStart, postCommentsSuccess, postCommentsFailure,
    deleteCommentsStart, deleteCommentsSuccess, deleteCommentsFailure,
} = commentsSlice.actions;

export default commentsSlice.reducer;