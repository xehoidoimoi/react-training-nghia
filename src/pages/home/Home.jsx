import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import { articleFollow, articleGlobal } from './../../redux/apiCalls';
import PaginatedItems, { Items } from '../profile/Pagination';


function Home() {
    const [ activeClass, setActiveClass ] = useState("person");
    const [ show, setShow ] = useState(true)
    const [ tags, setTags ] = useState([]);
    const [ tagName, setTagName ] = useState(null);
    // console.log("tagName: ", tagName, "show: ", show)
    const [ articleByTag, setArticleByTag ] = useState([]);
    // console.log(articleByTag)
    const dispatch = useDispatch();
    // * Get User
    const users = useSelector(state => state.users);
    // const usernameUser = users.currentUser?.user.username;

    const { isFetching } = useSelector(state => state.articles);

    //! Get Article Favorites
    const { articleFavorites } = useSelector(state => state.articleFavorites);
    console.log("articleFavorites", articleFavorites)

    // ! Get Article Global
    const articles = useSelector(state => state.articles);
    console.log("articles", articles.articles.articles)

    // ! Create Unique Current Item Article Global
    const items = articles.articles.articles ? articles.articles.articles?.concat(articleFavorites) : articles.articles;
    console.log("items", items)
    const data = new Map();
    for (const obj of items) {
        data.set(obj?.slug, obj);
    }
    let uniqueItems;
    if (users.currentUser) {
        uniqueItems = [ ...data.values() ];
    } else {
        uniqueItems = articles.articles.articles
    }
    // console.log(uniqueItems)
    // todo -----------------------------------------------------
    //! Set Article Follow (Feed)
    const { articlesFollow } = useSelector(state => state.articlesFollow);
    console.log("articlesFollow", articlesFollow);

    // ! Create Unique Current Item Article Global Follow (Feed)
    const itemsFollow = articlesFollow?.articles ? articlesFollow?.articles?.concat(articleFavorites) : articlesFollow;
    const dataFollow = new Map();
    for (const obj of itemsFollow) {
        dataFollow.set(obj?.slug, obj);
    }
    let uniqueItemsFollow
    if (users.currentUser) {
        uniqueItemsFollow = [ ...dataFollow.values() ];
    } else {
        uniqueItemsFollow = articlesFollow
    }

    useEffect(() => {
        //* Active Get Article Global when app run
        articleGlobal(dispatch, users);

        //* Get Article Follow when app run (Feed)
        users.currentUser && articleFollow(dispatch);

        // * Get Tags
        const getTags = async () => {
            try {
                const res = await publicRequest.get("/tags");
                setTags(res.data)
            } catch (error) {
                console.log(error)
            }
        };
        const getTagName = async () => {
            try {
                const res = await publicRequest.get(`/articles?tag=${tagName}&limit=10&offset=0`);
                setArticleByTag(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getTags();
        getTagName();
    }, [ dispatch, tagName, users ]);

    const handClick = (className) => {
        setActiveClass(className);
        if (tagName) {
            setTagName(null)
        };
        if (className === "person") {
            setShow(true);
        } else if (className === "global") {
            setShow(false)
        }
    };
    // ! Filter Tags
    const handleClickTag = (tag) => {
        setTagName(tag);
        setActiveClass("tag");
        setShow(false);
    }

    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                {
                                    users.currentUser
                                        ?
                                        <>
                                            <li className="nav-item">
                                                <Link
                                                    className={ activeClass === "person" ? "nav-link active" : "nav-link" }
                                                    href=""
                                                    onClick={ () => handClick("person") }
                                                >Your Feed</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    className={ activeClass === "global" ? "nav-link active" : "nav-link" }
                                                    href=""
                                                    onClick={ () => handClick("global") }
                                                >Global Feed</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    className={ activeClass === "tag" ? "nav-link active" : "nav-link" }
                                                    href=""
                                                    onClick={ () => handClick("tag") }
                                                >
                                                    { tagName && <i className="ion-pound"></i> }{ tagName }
                                                </Link>
                                            </li>
                                        </>
                                        :
                                        <>
                                            <li className="nav-item">
                                                <Link
                                                    className={ activeClass === "tag" ? "nav-link" : "nav-link active" }
                                                    href=""
                                                    onClick={ () => handClick("global") }
                                                >Global Feed</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    className={ activeClass === "tag" ? "nav-link active" : "nav-link" }
                                                    href=""
                                                    onClick={ () => handClick("tag") }
                                                >
                                                    { tagName && <i className="ion-pound"></i> }{ tagName }
                                                </Link>
                                            </li>
                                        </>
                                }
                            </ul>
                        </div>
                        {/* //todo Article Global Render */ }
                        {
                            users.currentUser
                                ? show
                                    ? uniqueItemsFollow
                                        ? uniqueItemsFollow?.length !== 0
                                            ? (<article>
                                                <PaginatedItems itemsPerPage={ 10 } articles={ uniqueItemsFollow } />
                                            </article>)
                                            : <div className="article-preview">
                                                No articles are here... yet.
                                            </div>
                                        : <div className="article-preview">Loading article, please wait...</div>
                                    : tagName
                                        ? <Items currentItems={ articleByTag.articles } />
                                        : isFetching
                                            ? <div className="article-preview">Loading article, please wait...</div>
                                            : (<article>
                                                <PaginatedItems itemsPerPage={ 10 } articles={ uniqueItems } />
                                            </article>)
                                : tagName
                                    ? <Items currentItems={ articleByTag.articles } />
                                    : isFetching
                                        ? <div className="article-preview">Loading article, please wait...</div>
                                        : (<article>
                                            <PaginatedItems itemsPerPage={ 10 } articles={ uniqueItems } />
                                        </article>)
                        }

                    </div>
                    {/* //todo Tags Render */ }
                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>
                            <div className="tag-list">
                                {
                                    tags.tags &&
                                    tags.tags.map((tag, index) => (
                                        <Link
                                            href=""
                                            key={ index }
                                            className="tag-pill tag-default"
                                            onClick={ () => handleClickTag(tag) }
                                        >
                                            { tag }
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home