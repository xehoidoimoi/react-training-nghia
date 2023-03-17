import React, { useState, } from 'react'
import { Link } from 'react-router-dom';
import { publicRequest, } from '../../requestMethods';
import { useNavigate } from 'react-router-dom';
import { registerFailure, registerStart, registerSuccess } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching } = useSelector(state => state.users)
    const [ user, setUser ] = useState({});
    const [ emailError, setEmailError ] = useState(null);
    const [ usernameError, setUsernameError ] = useState(null);
    const [ passwordError, setPasswordError ] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [ e.target.name ]: value });
    }
    // console.log(user);
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch(registerStart())
        try {
            await publicRequest.post("/users", { user: user });
            dispatch(registerSuccess())
            navigate("/login")
        } catch (error) {
            setEmailError(error.response.data.errors.email);
            setUsernameError(error.response.data.errors.username);
            setPasswordError(error.response.data.errors.password);
            dispatch(registerFailure())
        }
    };
    console.log(isFetching);

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <Link to="/login">Have an account?</Link>
                        </p>


                        { emailError && <ul className="error-messages">
                            <li>Email { emailError.toString() }</li>
                        </ul> }
                        { usernameError && <ul className="error-messages">
                            <li>Username { usernameError.toString() }</li>
                        </ul> }
                        { passwordError && <ul className="error-messages">
                            <li>Password { passwordError.toString() }</li>
                        </ul> }

                        <form>
                            <fieldset disabled={ isFetching }>
                                <fieldset className="form-group">
                                    <input name="username" className="form-control form-control-lg" type="text" placeholder="Username" onChange={ handleChange } />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input name="email" className="form-control form-control-lg" type="text" placeholder="Email" onChange={ handleChange } />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input name="password" className="form-control form-control-lg" type="password" placeholder="Password" onChange={ handleChange } />
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right" onClick={ handleClick }>Sign up</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register