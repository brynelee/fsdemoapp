import {
    LOGIN_START,
    LOGOUT,
    USER_NAME_CHANGE,
    PASSWORD_CHANGE,
    SWITCH_AUTH_METHOD,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from "./actiontypes";

import {LOGIN_STATUS_LOGOUT, 
    LOGIN_STATUS_LOADING,
    LOGIN_STATUS_SUCCESS,
    LOGIN_STATUS_FAILURE
} from './UserModel';

import {PWRightWid} from '../../constants';

export default (state = {
                        userNameTip: "手机号",
                        userName: "dahai",
                        userPWTip: "验证码",
                        userPW: "666666",
                        userToken: "",
                        changeBtnTitle: "使用账号密码登录",
                        PWRight: 0,
                        loginStatus: LOGIN_STATUS_LOGOUT
                        }, 
                action) => {
    
    console.log("authentication reducer was called with action.type as: ", action.type);
    console.log("authentication reducer was called with action.data: ", action.data);
    console.log("authenticationReducer - PWRightWid: ", PWRightWid);

    switch(action.type) {
        case USER_NAME_CHANGE:
            return {...state, userName: action.data};
        case PASSWORD_CHANGE:
            return {...state, userPW: action.data};
        case SWITCH_AUTH_METHOD:
            return {...state, 
                PWRight: state.PWRight == PWRightWid ? 0 : PWRightWid, 
                userNameTip: state.PWRight == PWRightWid ? "手机号" : "账户",
                userPWTip: state.PWRight == PWRightWid ? "验证码" : "密码",
                changeBtnTitle: state.PWRight == PWRightWid ? "使用账号密码登录" : "使用手机号验证码登录" }
        case LOGIN_START:
            return {...state, loginStatus: LOGIN_STATUS_LOADING};
        case LOGIN_SUCCESS:
            return {...state, loginStatus: LOGIN_STATUS_SUCCESS};
        case LOGIN_FAILURE:
            return {...state, loginStatus: LOGIN_STATUS_FAILURE};
        case LOGOUT:
            return {...state, loginStatus: LOGIN_STATUS_LOGOUT};
        default:
            return state;
    }
    
}


