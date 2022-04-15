import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { loginUser } from "../../redux/login/loginAction";

const Login = () => {

    const { loginStatus, userType, errorMsg } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [userLoginDetails, setuserLoginDetails] = useState({
        email: "",
        password: "",
    });

    const [loginError, setErrorMsg] = useState('');

    if (loginStatus) {
        if (userType === "doctor") {
            history.push("/appointment-request-list")
        } else {
            history.push("/doctor-list")
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserLoginDetails(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userLoginDetails.email === "") {
            setErrorMsg("Fill user name")
            return;
        } else if (userLoginDetails.password === "") {
            setErrorMsg("Fill Password")
            return;
        } else {
            setErrorMsg('')
            const data = {
                userID: userLoginDetails.email,
                password: userLoginDetails.password
            }
            dispatch(loginUser(data));
        }
    }

    return (
        <div className="login-form">
            <form className="form-horizontal" onSubmit={handleSubmit}>
                <p className="error-msg">{loginError}</p>
                <p className="error-msg">{errorMsg}</p>
                <div className="form-group">
                    <label className="control-label">User Name</label>
                    <input type="text" className="form-control" placeholder="User Name" name="email"
                        value={userLoginDetails.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="control-label ">Password</label>
                    <input type="password" className="form-control" placeholder="Password" name="password"
                        value={userLoginDetails.password} onChange={handleChange} />
                </div>
                <div className="row form-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login;