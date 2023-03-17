import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { deleteProfiles, getProfiles } from '../../redux/apiCalls';
import { publicRequest, userRequest } from '../../requestMethods';
import PaginatedItems from './Pagination';
import { postProfiles } from './../../redux/apiCalls';
import LoadingSpin from "react-loading-spin";

function Profile() {
    const [ show, setShow ] = useState(false);
    setTimeout(() => {
        setShow(true)
    }, 1000);

    const dispatch = useDispatch();
    // * Get Profile
    const { profiles, isFetching } = useSelector(state => state.profiles);
    // const usernameUser = users.currentUser?.user.username;
    // console.log("profiles", profiles)
    // * Get User
    const users = useSelector(state => state.users);
    const usernameUser = users.currentUser?.user.username;

    const [ articleSlug, setArticleSlug ] = useState(null);
    // console.log("articleMyArticle", articleSlug);

    // const [ profiles, setProfiles ] = useState(null);
    // console.log("profiles", profiles)

    const params = useParams();
    const username = params.username;
    // console.log("username", username)

    const location = useLocation();
    const favorite = location.pathname.split('/')[ 3 ];

    useEffect(() => {
        // * Get Article Slugs (My Articles)
        const getArticleSlug = async () => {
            try {
                const res =
                    username === usernameUser
                        ? await userRequest.get(`articles?author=${username}&limit=20&offset=0`)
                        : await publicRequest.get(`articles?author=${username}&limit=20&offset=0`);
                setArticleSlug(res.data)
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        };
        getArticleSlug();

        // * Active Get Profile when app run
        getProfiles(dispatch, username)

    }, [ username, dispatch, usernameUser ]);
    // * Handle Follow any Author 
    const handleFollow = () => {
        if (profiles?.following) {
            deleteProfiles(dispatch, username)
        } else {
            postProfiles(dispatch, username)
        }
    };

    return (
        <>
            { show
                ? <div className="profile-page" id="profile-page">
                    <div className="user-info">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-md-10 offset-md-1">
                                    <img src={ username === usernameUser ? users.currentUser.user.image : profiles?.image }
                                        className="user-img" alt='' />
                                    <h4>{ username === usernameUser ? usernameUser : profiles?.username }</h4>
                                    <p>
                                        { username === usernameUser ? users.currentUser.user.bio : profiles?.bio }
                                    </p>
                                    {
                                        username === usernameUser
                                            ? <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
                                                <i className="ion-plus-round"></i>
                                                &nbsp; Edit Profile Settings
                                            </Link>
                                            : users.currentUser
                                                ? <button
                                                    className="btn btn-sm btn-outline-secondary action-btn"
                                                    onClick={ handleFollow }
                                                    disabled={ isFetching }
                                                >
                                                    <i className="ion-plus-round"></i>
                                                    &nbsp; { profiles?.following ? "Unfollow" + username : "Follow" + username }
                                                </button>
                                                : <Link to="/login" className="btn btn-sm btn-outline-secondary action-btn">
                                                    <i className="ion-plus-round"></i>
                                                    &nbsp; { "Follow " + username }
                                                </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <div className="articles-toggle">
                                    <ul className="nav nav-pills outline-active">
                                        <li className="nav-item">
                                            <Link className={ favorite ? "nav-link" : "nav-link active" } to={ `/profile/${username}` }>My Articles</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={ favorite ? "nav-link active" : "nav-link" } to={ `/profile/${username}/favorites` } >Favorited Articles</Link>
                                        </li>
                                    </ul>
                                </div>
                                {/* //todo Render Article by slug*/ }
                                {
                                    favorite
                                        ? <Outlet context={ { username: username === usernameUser ? users.currentUser.user.username : articleSlug && articleSlug.articles[ 0 ]?.author.username } } />
                                        : articleSlug?.articles
                                            ? <PaginatedItems itemsPerPage={ 5 } articles={ articleSlug?.articles } />
                                            : <div className="article-preview">Loading article, please wait...</div>
                                }
                            </div>
                        </div>
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

export default Profile