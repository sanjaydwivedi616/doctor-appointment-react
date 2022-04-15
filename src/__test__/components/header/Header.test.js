import { Provider } from 'react-redux';
import { mount } from "enzyme";
import { createStore } from "redux";
import Header from '../../../component/header/Header';
import loginReducer from '../../../redux/login/loginReducer';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";
import { LogoutUser } from '../../../redux/login/loginAction';

describe('When Header page is randering', () => {

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

   /*  let logoutLink;
    it('should logout button is clicked', () => {
      
      const onClickFn = jest.fn();
      logoutLink = wrapper.find("NavLink")
      logoutLink.at(6).simulate('click');
      expect(logoutLink).toHaveBeenCalled()
    }) */
  
    it('Button action have been called with action type', () => {
      const handalLogoutUser = jest.fn();
      expect(mockStor.dispatch).toHaveBeenCalled()
    })
  
  })

  describe('should component render with invalid user name and password', () => {
    let wrapper, mockStor, history;
    beforeEach(() => {
      mockStor = createStore(loginReducer, {
        user: {
          loginData: {
            userName: "qweqe",
            userType: "qewqewqe323",
            doctorId: "",
            loginStatus: false,
            errorMsg: ""
          }
        }
      })
      mockStor.dispatch = jest.fn();
      history = createMemoryHistory();

      wrapper = mount(<Provider store={mockStor}><Router history={history}><Header /></Router></Provider>)
    })

    it('Should component render', () => {
      expect(wrapper.length).toBe(1)
    })
  })
})