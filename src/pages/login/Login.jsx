import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';

function Login() {
    const [ errorShow, setErrorShow ] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ user, setUser ] = useState({});
    let { error, isFetching } = useSelector(state => state.users);

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [ e.target.name ]: value });
    }

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { user: user }, navigate)
        setErrorShow(error)
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <Link to="/register">Need an account?</Link>
                        </p>

                        { errorShow && <ul className="error-messages">
                            <li>email or password is invalid</li>
                        </ul> }

                        <form >
                            <fieldset disabled={ isFetching }>
                                <fieldset className={ "form-group" }>
                                    <input name="email" className="form-control form-control-lg" type="text" placeholder="Email" onChange={ handleChange } />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input name="password" className="form-control form-control-lg" type="password" placeholder="Password" onChange={ handleChange } />
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right" onClick={ handleClick }>Sign in</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login