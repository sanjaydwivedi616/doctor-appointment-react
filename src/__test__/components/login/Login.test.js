
import { Provider } from 'react-redux';
import { mount } from "enzyme";
import { createStore } from "redux";
import Header from '../../../component/header/Header';
import loginReducer from '../../../redux/login/loginReducer';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";  

 describe('should component render with valid user name and password', () => {
    let wrapper, mockStor, history;
    beforeEach(() => {
      mockStor = createStore(loginReducer, {
        user: {
          loginData: {
            loginStatus: "rohit",
            userType: "user",
            doctorId: 12123,
            loginStatus: true,
            errorMsg: ""
          }
        }
      })
      mockStor.dispatch = jest.fn();
      history = createMemoryHistory();
      wrapper = mount(<Provider store={mockStor}><Router history={history}><Header loginStatus={true}/></Router></Provider>)
    })

    it('Should component render', () => {
      expect(wrapper.length).toBe(1)
    });
})