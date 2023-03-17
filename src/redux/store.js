import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import articleReducer from "./articleSlice";
import articleFollowReducer from "./articleFollowSlice";
import articleFavoritesReducer from "./articleFavoritesSlice";
import profilesReducer from "./profilesSlice";
import commentsReducer from "./commentsSlice";
import newArticlesReducer from "./newArticlesSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    users: userReducer,
    articles: articleReducer,
    articlesFollow: articleFollowReducer,
    articleFavorites: articleFavoritesReducer,
    profiles: profilesReducer,
    comments: commentsReducer,
    newArticles: newArticlesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
            },
        }),
});

export let persistor = persistStore(store);