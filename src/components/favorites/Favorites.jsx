import React from 'react'
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import PaginatedItems from "../../pages/profile/Pagination";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getArticleFavorites } from './../../redux/apiCalls';

function Favorites() {
    const dispatch = useDispatch();
    const { username } = useOutletContext();
    const { articleFavorites } = useSelector(state => state.articleFavorites);
    console.log("articleFavorites", articleFavorites);
    // let articleFavoritesCurrent = articleFavorites?.filter((ele) => ele.favorited);
    // console.log("articleFavoritesCurrent", articleFavoritesCurrent)
    //* Get Article Favorites
    useEffect(() => {
        // const getArticleFavorites = async () => {
        //     try {
        //         const res = await userRequest.get(`/articles?favorited=${username}&limit=20&offset=0`);
        //         // setArticleFavorites2(res.data.articles);
        //         console.log("articleFavoritesAPI", res.data)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
        // getArticleFavorites()
        getArticleFavorites(dispatch, username)
    }, [ dispatch, username ])

    return (
        articleFavorites && articleFavorites?.length !== 0
            ? <PaginatedItems itemsPerPage={ 5 } articles={ articleFavorites } />
            : <div className="article-preview">No articles are here... yet.</div>
    )
}

export default Favorites