import { faildLoginUer, loginUser, LogoutUser, updateUserDetail } from "../../../../../redux/login/loginAction"
import { LOGIN_FAILD, LOGIN_SUCCESS, LOGOUT } from "../../../../../redux/type/actionType"
import MockAdapter from "axios-mock-adapter"
import axios from "axios"

describe('When user is trying to login', () => {
    let mock;
    beforeEach(() => {
        mock = new MockAdapter(axios)
    })
    describe('When it is sucess', () => {
        it('Should Get User is successfully login', () => {
            const data = { userID: "test", password: "test" }
            const res = [{
                id: "deepika",
                userName: "deepika",
                password: "deepika",
                userType: "doctor",
                doctorId: "deepika111"
            }]

            mock.onGet(`http://localhost:3333/userList/?userID=${data.userID}&password=${data.password}`).reply(200, res);

            let actionfn = loginUser(data);
            let dispatch = jest.fn();
            actionfn(dispatch);

            expect(dispatch).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledTimes(1);
            expect(dispatch.mock.calls[0]).toEqual([updateUserDetail(res)]);
        });
    });


    it('Should login in faild with invalide user name and password', () => {
        const data = { userID: "invalid", password: "invalid" }
        let actionfn = loginUser(data);
        const res = []
        mock.onGet(`http://localhost:3333/userList/?userID=${data.userID}&password=${data.password}`).reply(201, res);

        let dispatch = jest.fn();
        actionfn(dispatch);

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0]).toEqual(faildLoginUer(res));
    });

    it('Should Get User login in faild with some error...', () => {
        const data = { userID: "hellohello", password: "hellohello" }
        const res = []
        mock.onGet(`http://localhost:3333/userList/?userID=${data.userID}&password=${data.password}`).reply(404, res);

        let actionfn = loginUser(data);
        let dispatch = jest.fn();
        actionfn(dispatch);
        const resData = { payload: "User name or password invalid", type: "LOGIN_FAILD" }

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0]).toEqual([faildLoginUer(resData)]);
    })
})


describe('Whene user is trying to login', () => {

    it('When user is login and status is success.', () => {
        const data = { id: "deepika1213", password: "deepika123" };
        const action = {
            type: LOGIN_SUCCESS,
            payload: data
        }
        const result = updateUserDetail(data);
        expect(result).toEqual(action)
    })

    it('When user login is faild.', () => {
        const data = "User name or password invalid";
        const action = {
            type: LOGIN_FAILD,
            payload: data
        }
        const result = faildLoginUer()
        expect(result).toEqual(action)
    })

    it('When user is logout', () => {
        const result = LogoutUser()
        expect(result).toEqual({ type: LOGOUT })
    })
})
