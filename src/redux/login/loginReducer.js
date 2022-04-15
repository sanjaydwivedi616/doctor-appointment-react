import { LOGIN_SUCCESS, LOGOUT, LOGIN_FAILD } from "../type/actionType"

let loginData = {
    userName: "",
    userType: "",
    doctorId :"",
    loginStatus: false,
    errorMsg: ""
}

const loginReducer = (state = loginData, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                userName: action.payload[0].userName,
                userType: action.payload[0].userType,
                doctorId: action.payload[0].doctorId,
                loginStatus: true
            }
        case LOGIN_FAILD:
            return {
                ...state,
                errorMsg: action.payload
            }
        case LOGOUT:
            return {
                loginData
            }
        default:
            return state
    }
}

export default loginReducer;
