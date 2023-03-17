import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    articles: [],
    isFetching: false,
    error: false
}


export const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        // * Get articles global
        getArticleStart(state) {
            state.isFetching = true;
            state.error = false;
        },
        getArticleSuccess(state, action) {
            state.articles = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        getArticleFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { getArticleStart, getArticleSuccess, getArticleFailure, } = articleSlice.actions;
export default articleSlice.reducer;