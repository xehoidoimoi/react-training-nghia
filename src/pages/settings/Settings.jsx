import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userUpdated } from '../../redux/apiCalls';
import { logout } from "../../redux/userSlice"

function Settings() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, isFetching } = useSelector(state => state.users);
    // console.log("users", currentUser)
    let imageRef = useRef();
    let usernameRef = useRef();
    let emailRef = useRef();
    let bioRef = useRef();
    let passwordRef = useRef();
    // console.log("imageRef.current.value", imageRef)
    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/")
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        let bodyUpdate = {
            user: {
                image: imageRef.current.value,
                username: usernameRef.current.value,
                email: emailRef.current.value,
                bio: bioRef.current.value,
                password: passwordRef.current.value
            }
        }
        userUpdated(dispatch, bodyUpdate, navigate)
    }
    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <form>
                            <fieldset disabled={ isFetching }>
                                <fieldset className="form-group">
                                    <input
                                        name="image"
                                        className="form-control"
                                        type="text"
                                        placeholder="URL of profile picture"
                                        defaultValue={ currentUser.user.image }
                                        ref={ imageRef }
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        name="username"
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your Name"
                                        defaultValue={ currentUser.user.username }
                                        ref={ usernameRef }
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        rows="8"
                                        placeholder="Short bio about you"
                                        defaultValue={ currentUser.user.bio }
                                        ref={ bioRef }
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        name="email"
                                        className="form-control 
                                    form-control-lg"
                                        type="text"
                                        defaultValue={ currentUser.user.email }
                                        placeholder="Email"
                                        ref={ emailRef }
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                        defaultValue={ currentUser.user.password }
                                        ref={ passwordRef }
                                    />
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right" onClick={ handleUpdate }>Update Settings</button>
                            </fieldset>
                        </form>
                        <hr />
                        <button className="btn btn-outline-danger" onClick={ handleLogOut }>Or click here to logout.</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings