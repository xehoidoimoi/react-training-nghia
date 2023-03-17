import React, { useEffect, useRef, useState } from 'react'
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { addArticleFavorites, deleteProfiles, getProfiles, postProfiles, deleteArticleFavorites, getComments, postComments } from '../../redux/apiCalls';
import { deleteComments, deleteNewArticles } from './../../redux/apiCalls';
import { publicRequest } from './../../requestMethods';
import LoadingSpin from "react-loading-spin";

function Article() {
    const dispatch = useDispatch();
    const location = useLocation();
    // console.log("location", location)
    const params = useParams();
    const slug = params.title
    const inputRef = useRef();
    const textNeedEdit = useRef();
    const navigate = useNavigate();
    // const inputRef = 

    const [ comment, setComment ] = useState(null);

    const { articleFavorites } = useSelector(state => state.articleFavorites);
    // console.log("articleFavorites", articleFavorites)

    // const article = state.article;
    const [ article, setArticle ] = useState(null)
    // console.log("article", article)

    const users = useSelector(state => state.users);
    // console.log(users.currentUser)
    const username = article?.author?.username;

    let articleCurrent = articleFavorites?.find((articleFavorite) => articleFavorite.slug === article?.slug) || article;
    // console.log("articleCurrent", articleCurrent)

    // * Get Comments State
    let { comments } = useSelector(state => state.comments);
    // console.log("comments state", comments)
    // const commentsState = useSelector(state => state.comments);
    // console.log("commentsState", commentsState)
    comments = comments?.slice().sort(function (a, b) { return Date.parse(b.createdAt) - Date.parse(a.createdAt) });
    // console.log("commentsSorted", comments)

    // * Get Profile
    const { profiles, isFetching } = useSelector(state => state.profiles);
    // console.log("profiles", profiles)
    // ! -------------Use Effect-------------
    useEffect(() => {
        // * Active Get Profile when app run
        getProfiles(dispatch, username)

        // * Get Comments when app run
        getComments(dispatch, article?.slug)

        // * Get Article By Slug when app run
        const getArticleBySlug = async () => {
            const res = await publicRequest.get(`/articles/${slug}`);
            // console.log("getArticleBySlug", res.data.article);
            setArticle(res.data.article)
        };
        getArticleBySlug()
    }, [ dispatch, username, article?.favorited, article?.slug, slug ]);
    // ! -------------Use Effect-------------

    // * Handle Follow
    const handleFollow = () => {
        if (profiles?.following) {
            deleteProfiles(dispatch, username)
        } else {
            postProfiles(dispatch, username)
        }
    };

    // * Handle Favorited
    const handleFavorited = (e, article) => {
        // console.log(e.target.parentElement)
        let eventTarget
        if (e.target.className === "ion-heart") {
            eventTarget = e.target.parentElement;
        } else {
            eventTarget = e.target;
        }
        if (eventTarget.classList.contains("active")) {
            deleteArticleFavorites(dispatch, article?.slug, eventTarget);
        } else {
            addArticleFavorites(dispatch, article?.slug, eventTarget);
        }
    };

    // * Handle Comment Change
    const handleCommentChange = (e) => {
        setComment({ "comment": { "body": e.target.value } })
    };
    // console.log("comment", comment);

    // * Handle Post Comment 
    const handlePostComment = (e) => {
        e.preventDefault();
        postComments(dispatch, article?.slug, comment);
        inputRef.current.value = "";
    }

    // * Handle Delete Comment
    const handleDeleteComment = (id) => {
        if (window.confirm("Do you want to delete...") === true) {
            deleteComments(dispatch, article?.slug, id)
        }
    }

    // * Handle Edit Comment
    // const handleEditComment = (e, id) => {
    //     // Select parent:
    //     let p = e.target.parentElement.parentElement.parentElement.children[ 0 ];
    //     console.log(p.innerText);
    //     // Create a new text node:
    //     const newInput = document.createElement("input");
    //     newInput.classList.add("card-text");
    //     newInput.classList.add("new-input");
    //     newInput.innerText = p.innerText;
    //     // Replace the text node:
    //     // p.replaceChild(newInput, p.children[ 0 ]);
    //     p.innerHTML = <div>ha</div>
    // };

    const handleDeleteArticle = () => {
        deleteNewArticles(dispatch, article?.slug, navigate)
    };

    return (
        <>
            {
                article && profiles
                    ? <div className="article-page">
                        <div className="banner">
                            <div className="container">
                                <h1>{ article?.title }</h1>

                                <div className="article-meta">
                                    <Link to={ `/profile/${username}` }><img src={ article?.author?.image } alt="" /></Link>
                                    <div className="info">
                                        <Link to={ `/profile/${username}` } className="author">{ username }</Link>
                                        <span className="date">{ format(new Date(article?.createdAt), 'MMMM-dd-yyyy') }</span>
                                    </div>
                                    {/* //todo Render button logic about follow and favorite */ }
                                    {
                                        users.currentUser
                                            ? users.currentUser.user.username === article.author.username
                                                ? <>
                                                    <Link to={ `/editor/${article.slug}` } state={ article }
                                                        className="btn btn-sm btn-outline-secondary"
                                                    >
                                                        <i className="ion-edit"></i>
                                                        &nbsp; Edit Article
                                                    </Link>
                                                    &nbsp;&nbsp;
                                                    <button className="btn btn-outline-danger btn-sm"
                                                        onClick={ handleDeleteArticle }
                                                    >
                                                        <i className="ion-trash-a"></i>
                                                        &nbsp; Delete Article
                                                    </button>
                                                </>
                                                : <>
                                                    <button
                                                        className={ profiles?.following ? "btn btn-sm btn-outline-secondary active" : "btn btn-sm btn-outline-secondary" }
                                                        onClick={ handleFollow }
                                                        disabled={ isFetching }
                                                    >
                                                        <i className="ion-plus-round"></i>
                                                        &nbsp; { profiles?.following ? "Unfollow" + username : "Follow " + username }
                                                    </button>
                                                    &nbsp;&nbsp;
                                                    <button className={ articleCurrent?.favorited ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary" }
                                                        onClick={ (e) => handleFavorited(e, articleCurrent) }
                                                    >
                                                        <i className="ion-heart"></i>
                                                        { articleCurrent?.favorited ? " Unfavorite Article " : " Favorite Article " }
                                                        <span className="counter">({ articleCurrent?.favoritesCount || article?.favoritesCount })</span>
                                                    </button>
                                                </>
                                            :
                                            <>
                                                <Link to="/login" className="btn btn-sm btn-outline-secondary">
                                                    <i className="ion-plus-round"></i>
                                                    &nbsp; { "Follow" + username }
                                                </Link>
                                                &nbsp;&nbsp;
                                                <Link to="/login" className="btn btn-sm btn-outline-primary">
                                                    <i className="ion-heart"></i>
                                                    Favorite Article
                                                    <span className="counter">({ article?.favoritesCount })</span>
                                                </Link>
                                            </>
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="container page">
                            <div className="row article-content">
                                <div className="col-md-12">
                                    <p>
                                        { article?.body }
                                    </p>
                                    {/* <h2 id="introducing-ionic">Introducing RealWorld.</h2> */ }
                                    {/* <p>It's a great solution for learning how other frameworks work.</p> */ }
                                </div>
                                <ul className="tag-list">
                                    {
                                        article?.tagList?.map((tag, index) => (
                                            <li className="tag-default tag-pill tag-outline" key={ index }>{ tag }</li>
                                        ))
                                    }
                                </ul>
                            </div>

                            <hr />

                            <div className="article-actions">
                                <div className="article-meta">
                                    <Link to={ `/profile/${username}` }><img src={ article?.author?.image } alt="" /></Link>
                                    <div className="info">
                                        <Link to={ `/profile/${username}` } className="author">{ username }</Link>
                                        <span className="date">{ format(new Date(article?.createdAt), 'MMMM-dd-yyyy') }</span>
                                    </div>
                                    {
                                        users.currentUser
                                            ? users.currentUser.user.username === article.author.username
                                                ? <>
                                                    <Link to={ `/editor/${article.slug}` } state={ article }
                                                        className="btn btn-sm btn-outline-secondary"
                                                    >
                                                        <i className="ion-edit"></i>
                                                        &nbsp; Edit Article
                                                    </Link>
                                                    &nbsp;&nbsp;
                                                    <button className="btn btn-outline-danger btn-sm"
                                                        onClick={ handleDeleteArticle }
                                                    >
                                                        <i className="ion-trash-a"></i>
                                                        &nbsp; Delete Article
                                                    </button>
                                                </>
                                                : <>
                                                    <button
                                                        className={ profiles?.following ? "btn btn-sm btn-outline-secondary active" : "btn btn-sm btn-outline-secondary" }
                                                        onClick={ handleFollow }
                                                        disabled={ isFetching }
                                                    >
                                                        <i className="ion-plus-round"></i>
                                                        &nbsp; { profiles?.following ? "Unfollow" + username : "Follow " + username }
                                                    </button>
                                                    &nbsp;&nbsp;
                                                    <button className={ articleCurrent?.favorited ? "btn btn-sm btn-outline-primary active" : "btn btn-sm btn-outline-primary" }
                                                        onClick={ (e) => handleFavorited(e, articleCurrent) }
                                                    >
                                                        <i className="ion-heart"></i>
                                                        { articleCurrent?.favorited ? " Unfavorite Article " : " Favorite Article " }
                                                        <span className="counter">({ articleCurrent?.favoritesCount || article?.favoritesCount })</span>
                                                    </button>
                                                </>
                                            : <>
                                                <Link to="/login" className="btn btn-sm btn-outline-secondary">
                                                    <i className="ion-plus-round"></i>
                                                    &nbsp; { "Follow " + username }
                                                </Link>
                                                &nbsp;&nbsp;
                                                <Link to="/login" className="btn btn-sm btn-outline-primary">
                                                    <i className="ion-heart"></i>
                                                    Favorite Article
                                                    <span className="counter">({ article?.favoritesCount })</span>
                                                </Link>
                                            </>
                                    }
                                </div>
                            </div>
                            {/* //todo ----------------------------COMMENT----------------------  */ }
                            {
                                users.currentUser
                                    ?
                                    <div className="row">
                                        <div className="col-xs-12 col-md-8 offset-md-2">
                                            <form className="card comment-form">
                                                <div className="card-block">
                                                    <textarea
                                                        ref={ inputRef }
                                                        className="form-control" placeholder="Write a comment..." rows="3"
                                                        onChange={ handleCommentChange }
                                                    ></textarea>
                                                </div>
                                                <div className="card-footer">
                                                    <img src={ users.currentUser?.user.image } className="comment-author-img" alt='' />
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={ handlePostComment }
                                                    >Post Comment</button>
                                                </div>
                                            </form>
                                            {/* //todo ----------------------------RENDER COMMENT----------------------  */ }
                                            {
                                                comments?.length > 0 &&
                                                (
                                                    comments?.map((comment) => (
                                                        <div className="card" key={ comment.id }>
                                                            <div className="card-block">
                                                                <p className="card-text"
                                                                    ref={ textNeedEdit }
                                                                >
                                                                    { comment.body }
                                                                </p>
                                                            </div>
                                                            <div className="card-footer" >
                                                                <Link href="" className="comment-author">
                                                                    <img src={ comment.author.image } className="comment-author-img" alt='' />
                                                                </Link>
                                                                &nbsp;&nbsp;&nbsp;
                                                                <Link href="" className="comment-author">{ comment.author?.username }</Link>
                                                                <span className="date-posted">{ format(new Date(comment?.createdAt), 'MMMM-dd-yyyy').replace(/-/g, " ") }</span>
                                                                <span className="mod-options">
                                                                    {/* <i
                                                                        className="ion-edit"
                                                                    ></i> */}
                                                                    &nbsp;&nbsp;&nbsp;
                                                                    <i
                                                                        className="ion-trash-a"
                                                                        onClick={ () => handleDeleteComment(comment.id) }
                                                                    ></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))
                                                )
                                            }
                                        </div>
                                    </div>
                                    : <p style={ { marginLeft: 120 } }>
                                        <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link> to add comments on this article.
                                    </p>
                            }
                        </div>
                    </div>
                    : <div className={ "ExampleOfUsage" }>
                        <LoadingSpin
                            duration="2s"
                            width="15px"
                            timingFunction="ease-in-out"
                            direction="alternate"
                            size="100px"
                            primaryColor="yellow"
                            secondaryColor="#333"
                            numberOfRotationsInAnimation={ 2 }
                        />
                    </div>
            }
        </>
    )
}

export default Article