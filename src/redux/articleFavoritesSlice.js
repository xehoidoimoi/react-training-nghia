import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    articleFavorites: [],
    isFetching: false,
    error: false
}


export const articleFavoritesSlice = createSlice({
    name: 'articleFavorites',
    initialState,
    reducers: {
        // * Get articles favorites
        getArticleFavoritesStart(state) {
            state.isFetching = true;
            state.error = false;
        },
        getArticleFavoritesSuccess(state, action) {
            state.articleFavorites = action.payload.articles;
            state.isFetching = false;
            state.error = false;
        },
        getArticleFavoritesFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
        // * Add articles favorites
        addArticleFavoritesStart(state) {
            // state.articleFavorites = [];
            state.isFetching = true;
            state.error = false;
        },
        addArticleFavoritesSuccess(state, action) {
            const { slug, favorited, favoritesCount } = action.payload.article;
            const existingArticle = state.articleFavorites.find((ele) => ele.slug === slug);
            if (existingArticle) {
                existingArticle.favorited = favorited;
                existingArticle.favoritesCount = favoritesCount;
            } else {
                state.articleFavorites = [ ...state.articleFavorites, action.payload.article ];
            }
            // state.articleFavorites = [ ...state.articleFavorites, action.payload.article ];
            state.isFetching = false;
            state.error = false;
        },
        addArticleFavoritesFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
        // * Delete articles favorites
        deleteArticleFavoritesStart(state) {
            state.isFetching = true;
            state.error = false;
        },
        deleteArticleFavoritesSuccess(state, action) {
            // state.articleFavorites = state.articleFavorites.filter((item) => item.slug !== action.payload.article.slug);
            // if (state.articleFavorites?.find((element) => element.slug === action.payload.article.slug)) {
            //     state.articleFavorites.forEach((element) => {
            //         return element.slug === action.payload.article.slug && action.payload.article
            //     });
            // } else {
            //     state.articleFavorites = [];
            // }
            const { slug, favorited, favoritesCount } = action.payload.article;
            const existingArticle = state.articleFavorites.find((ele) => ele.slug === slug);
            if (existingArticle) {
                existingArticle.favorited = favorited;
                existingArticle.favoritesCount = favoritesCount;
            }
            state.isFetching = false;
            state.error = false;
        },
        deleteArticleFavoritesFailure(state) {
            // state.articleFavorites = [ ...state.articleFavorites ];
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    getArticleFavoritesStart, getArticleFavoritesSuccess, getArticleFavoritesFailure,
    addArticleFavoritesStart, addArticleFavoritesSuccess, addArticleFavoritesFailure,
    deleteArticleFavoritesStart, deleteArticleFavoritesSuccess, deleteArticleFavoritesFailure
}
    = articleFavoritesSlice.actions;

export default articleFavoritesSlice.reducer;
