import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    articlesFollow: [],
    isFetching: false,
    error: false
}


export const articleFollowSlice = createSlice({
    name: 'articlesFollow',
    initialState,
    reducers: {
        // * Get articles follow
        getArticleFollowStart(state) {
            state.isFetching = true;
            state.error = false;
        },
        getArticleFollowSuccess(state, action) {
            state.articlesFollow = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        getArticleFollowFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const { getArticleFollowStart, getArticleFollowSuccess, getArticleFollowFailure } = articleFollowSlice.actions;
export default articleFollowSlice.reducer;