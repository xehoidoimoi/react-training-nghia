import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, userUpdatedFailure, userUpdatedStart, userUpdatedSuccess } from "./userSlice";
import { getArticleStart, getArticleSuccess, getArticleFailure } from "./articleSlice";
import { getArticleFollowFailure, getArticleFollowStart, getArticleFollowSuccess } from "./articleFollowSlice";
import { addArticleFavoritesFailure, addArticleFavoritesStart, addArticleFavoritesSuccess, deleteArticleFavoritesFailure, deleteArticleFavoritesStart, deleteArticleFavoritesSuccess, getArticleFavoritesFailure, getArticleFavoritesStart, getArticleFavoritesSuccess } from "./articleFavoritesSlice";
import { deleteProfilesFailure, deleteProfilesStart, deleteProfilesSuccess, getProfilesFailure, getProfilesStart, getProfilesSuccess, postProfilesFailure, postProfilesStart, postProfilesSuccess } from "./profilesSlice";
import { deleteCommentsFailure, deleteCommentsStart, deleteCommentsSuccess, getCommentsFailure, getCommentsStart, getCommentsSuccess, postCommentsFailure, postCommentsStart, postCommentsSuccess } from "./commentsSlice";
import { deleteNewArticlesFailure, deleteNewArticlesStart, postNewArticlesFailure, postNewArticlesStart, postNewArticlesSuccess, updateNewArticlesFailure, updateNewArticlesStart } from "./newArticlesSlice";

// todo USERS
// *User Login
export const login = async (dispatch, user, navigate) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/users/login", user);
        // console.log("login", res.data)
        dispatch(loginSuccess(res.data));
        navigate("/")
    } catch (error) {
        dispatch(loginFailure());
        // console.log(error.response.status)
    }
}
// *User Update
export const userUpdated = async (dispatch, bodyUpdate, navigate) => {
    dispatch(userUpdatedStart());
    try {
        const res = await userRequest.put("/user", bodyUpdate);
        dispatch(userUpdatedSuccess(res.data));
        // console.log("userUpdatedSuccess", res.data)
        navigate(`/profile/${res.data.user.username}`)
    } catch (error) {
        dispatch(userUpdatedFailure());
        // console.log("error", error, bodyUpdate)
    }
}

// todo ARTICLE
// * Get Article Global
export const articleGlobal = async (dispatch, users) => {
    dispatch(getArticleStart());
    try {
        const res =
            users.currentUser
                ? await userRequest.get("/articles?limit=300&offset=0")
                : await publicRequest.get("/articles?limit=300&offset=0");
        dispatch(getArticleSuccess(res.data));
        // console.log("articleGlobal", res.data)
    } catch (error) {
        // console.log(error.response.status)
        dispatch(getArticleFailure());
    }
}

// * Get Article Follow (Feed)
export const articleFollow = async (dispatch) => {
    dispatch(getArticleFollowStart());
    try {
        const res = await userRequest.get("/articles/feed");
        // console.log(res)
        dispatch(getArticleFollowSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(getArticleFollowFailure());
    }
}

// // * Get Article By Slug
// export const articleBySlug = async (dispatch, slug) => {
//     dispatch(getArticleFollowStart());
//     try {
//         const res = await publicRequest.get(`/articles/${slug}`);
//         // console.log(res)
//         dispatch(getArticleFollowSuccess(res.data));
//     } catch (error) {
//         console.log(error)
//         dispatch(getArticleFollowFailure());
//     }
// }

// * Get Article Favorites
export const getArticleFavorites = async (dispatch, username) => {
    dispatch(getArticleFavoritesStart());
    try {
        const res = await userRequest.get(`/articles?favorited=${username}&limit=20&offset=0`);
        dispatch(getArticleFavoritesSuccess(res.data));
        // console.log("ArticleFavoritesAPI", res.data)
    } catch (error) {
        // console.log(error)
        dispatch(getArticleFavoritesFailure());
    }
}

// * Add Article Favorites
export const addArticleFavorites = async (dispatch, slug, eventTarget,) => {
    dispatch(addArticleFavoritesStart());
    eventTarget.disabled = true;
    // console.log(eventTarget.disable)
    try {
        const res = await userRequest.post(`/articles/${slug}/favorite`);
        dispatch(addArticleFavoritesSuccess(res.data));
        eventTarget.disabled = false;
        eventTarget.classList.add("active");
        // console.log("postFavorites", res.data)
    } catch (error) {
        // console.log(error)
        dispatch(addArticleFavoritesFailure());
        eventTarget.disabled = false;
    }
}

// * Delete Article Favorites
export const deleteArticleFavorites = async (dispatch, slug, eventTarget) => {
    dispatch(deleteArticleFavoritesStart());
    eventTarget.disabled = true;
    try {
        const res = await userRequest.delete(`/articles/${slug}/favorite`);
        dispatch(deleteArticleFavoritesSuccess(res.data));
        // console.log("deleteFavorites", res.data)
        // setProfileFavorited(res.data);
        eventTarget.disabled = false;
        eventTarget.classList.remove("active");

    } catch (error) {
        // console.log(error)
        dispatch(deleteArticleFavoritesFailure());
        eventTarget.disabled = false;
    }
};
// todo Profiles
// * Get Profiles
export const getProfiles = async (dispatch, username) => {
    dispatch(getProfilesStart());
    try {
        const res = await publicRequest.get(`profiles/${username}`);
        dispatch(getProfilesSuccess(res.data));
    } catch (error) {
        // console.log(error)
        dispatch(getProfilesFailure());
    }
}

// * Post Profiles
export const postProfiles = async (dispatch, username) => {
    dispatch(postProfilesStart());
    try {
        const res = await userRequest.post(`profiles/${username}/follow`);
        dispatch(postProfilesSuccess(res.data));
    } catch (error) {
        // console.log(error)
        dispatch(postProfilesFailure());
    }
};

// * Delete Profiles
export const deleteProfiles = async (dispatch, username) => {
    dispatch(deleteProfilesStart());
    try {
        const res = await userRequest.delete(`profiles/${username}/follow`);
        dispatch(deleteProfilesSuccess(res.data));

    } catch (error) {
        // console.log(error)
        dispatch(deleteProfilesFailure());
    }
}

// todo ---------------Comments--------------

// * Get Comments
export const getComments = async (dispatch, slug) => {
    dispatch(getCommentsStart());
    try {
        const res = await userRequest.get(`articles/${slug}/comments`);
        dispatch(getCommentsSuccess(res.data));
        // console.log("getCommentsAPI", res.data)
    } catch (error) {
        // console.log(error)
        dispatch(getCommentsFailure());
    }
}

// * Post Comments
export const postComments = async (dispatch, slug, comment) => {
    dispatch(postCommentsStart());
    try {
        const res = await userRequest.post(`articles/${slug}/comments`, comment);
        dispatch(postCommentsSuccess(res.data));
        // console.log("postCommentsAPI", res.data)
    } catch (error) {
        // console.log(error)
        dispatch(postCommentsFailure());
    }
}

// * Delete Comments
export const deleteComments = async (dispatch, slug, id) => {
    dispatch(deleteCommentsStart());
    try {
        const res = await userRequest.delete(`articles/${slug}/comments/${id}`);
        dispatch(deleteCommentsSuccess(id));
        // console.log("deleteCommentsAPI", res.data)
    } catch (error) {
        // console.log(error)
        dispatch(deleteCommentsFailure());
    }
}

// todo ---------------New Articles--------------

// * Post New Articles
export const postNewArticles = async (dispatch, article, navigate, setIsFetching, setTitleError, setDescError, setBodyError) => {
    dispatch(postNewArticlesStart());
    setIsFetching(true)
    try {
        const res = await userRequest.post(`/articles`, article);
        dispatch(postNewArticlesSuccess(res.data));
        navigate(`/article/${res.data.article.slug}`)
        setIsFetching(false)
        // console.log("postNewArticlesAPI", res.data)
    } catch (error) {
        // console.log(error)
        setTitleError(error.response.data.errors.title)
        setDescError(error.response.data.errors.description)
        setBodyError(error.response.data.errors.body)
        dispatch(postNewArticlesFailure());
        setIsFetching(false)
    }
}

// * Delete New Articles
export const deleteNewArticles = async (dispatch, slug, navigate,) => {
    dispatch(deleteNewArticlesStart());
    try {
        const res = await userRequest.delete(`articles/${slug}`);
        // dispatch(deleteNewArticlesSuccess(id));
        navigate("/")
        // console.log("deleteNewArticlesAPI", res.data)
    } catch (error) {
        // console.log(error)
        dispatch(deleteNewArticlesFailure());
    }
}

// * Update New Articles
export const updateNewArticles = async (dispatch, slug, article, navigate, setIsFetching) => {
    dispatch(updateNewArticlesStart());
    setIsFetching(true)
    try {
        const res = await userRequest.put(`articles/${slug}`, article);
        // dispatch(updateNewArticlesSuccess(id));
        navigate(`/article/${res.data.article.slug}`)
        setIsFetching(false)
        // console.log("updateNewArticlesAPI", res.data)
    } catch (error) {
        // console.log(error)
        dispatch(updateNewArticlesFailure());
        setIsFetching(false)
    }
}