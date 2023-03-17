import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { postNewArticles, updateNewArticles } from './../../redux/apiCalls';

function CreateArticle() {
    const [ newArticle, setArticle ] = useState(null);
    // console.log("newArticle", newArticle);
    const [ tags, setTags ] = useState([]);
    const [ titleError, setTitleError ] = useState(null);
    const [ descError, setDescError ] = useState(null);
    const [ bodyError, setBodyError ] = useState(null);
    let titleRef = useRef();
    let descRef = useRef();
    let bodyRef = useRef();
    let tagRef = useRef();


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useLocation();
    const article = state.state;
    // console.log("titleRef", titleRef.current)
    // const location = useLocation();
    // console.log("location", location)
    // titleRef.current.value = article?.title

    const handleChangeTag = (e) => {
        let value = e.target.value;
        if (value.endsWith(".") || value.endsWith(",")) {
            value = value.slice(0, -1)
        }
        let tagsArray = value.replace(/\s+/, "").split(",");
        setTags(tagsArray)
    };
    // console.log("tags", tags)

    const handleChange = (e) => {
        const value = e.target.value;
        setArticle({
            ...newArticle,
            [ e.target.name ]: value
        })
    };

    let obj = { article: { ...newArticle, tagList: tags } };
    // console.log("obj", obj)
    const [ isFetching, setIsFetching ] = useState(false)
    const handleCreate = (e) => {
        // e.preventDefault();
        postNewArticles(dispatch, obj, navigate, setIsFetching, setTitleError, setDescError, setBodyError)
    };
    const handleUpdate = () => {
        let value = tagRef.current.value;
        if (value.endsWith(".") || value.endsWith(",")) {
            value = value.slice(0, -1)
        }
        let tagsArray = value.replace(/\s+/, "").split(",");

        let objUpdate = {
            article: {
                title: titleRef.current.value,
                description: descRef.current.value,
                body: bodyRef.current.value,
                tagList: tagsArray
            }
        };
        updateNewArticles(dispatch, article.slug, objUpdate, navigate, setIsFetching);
        console.log("objUpdate", objUpdate)
    }
    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <div>
                            <ul className="error-messages ng-hide">
                                { titleError && <li>Title { titleError.toString() }</li> }
                                { descError && <li>Description { descError.toString() }</li> }
                                { bodyError && <li>Body { bodyError.toString() }</li> }
                            </ul>
                        </div>

                        <form>
                            <fieldset disabled={ isFetching }>
                                <fieldset className="form-group">
                                    <input type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Article Title"
                                        name="title"
                                        ref={ titleRef }
                                        defaultValue={ article?.title }
                                        onChange={ (e) => handleChange(e) }
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="What's this article about?"
                                        name="description"
                                        ref={ descRef }
                                        defaultValue={ article?.description }
                                        onChange={ (e) => handleChange(e) }
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control"
                                        rows="8"
                                        placeholder="Write your article (in markdown)"
                                        name="body"
                                        ref={ bodyRef }
                                        defaultValue={ article?.body }
                                        onChange={ (e) => handleChange(e) }
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Enter tags"
                                        name="tagList"
                                        ref={ tagRef }
                                        defaultValue={ article?.tagList.toString() }
                                        onChange={ (e) => handleChangeTag(e) }
                                    />
                                    <div className="tag-list"></div>
                                </fieldset>
                                {
                                    article
                                        ? <button className="btn btn-lg pull-xs-right btn-primary"
                                            type="button"
                                            onClick={ handleUpdate }
                                        >
                                            Update Article
                                        </button>
                                        : <button className="btn btn-lg pull-xs-right btn-primary"
                                            type="button"
                                            onClick={ handleCreate }
                                        >
                                            Publish Article
                                        </button>
                                }

                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateArticle