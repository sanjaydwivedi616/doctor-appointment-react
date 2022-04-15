import { LOGIN_SUCCESS, LOGOUT, LOGIN_FAILD } from "../type/actionType";
import axios from 'axios';
import { baseUrl } from "../../apiCall/api";

export const loginUser = (data) => {
    return (dispatch => {
        axios.get(`${baseUrl}/userList/?userID=${data.userID}&password=${data.password}`).then(res => {
            if (res.data.length > 0) {
                dispatch(updateUserDetail(res.data));
            } else {
                dispatch(faildLoginUer())
            }
        }).catch(() => {
            dispatch(faildLoginUer())
        })
    })
}

/* export const loginUser = (data) => {
    return (async dispatch => {
        try {
            const resData = await axios.get(`${baseUrl}/userList/?userID=${data.userID}&password=${data.password}`)
            if (res.data.length > 0) {
                dispatch(updateUserDetail(resData.data));
            } else {
                dispatch(faildLoginUer())
            }
        } catch (error) {
            dispatch(faildLoginUer())
        }
    })
} */

export const updateUserDetail = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}

export const faildLoginUer = () => {
    return {
        type: LOGIN_FAILD,
        payload: "User name or password invalid"
    }
}

export const LogoutUser = () => {
    return {
        type: LOGOUT
    }
}
