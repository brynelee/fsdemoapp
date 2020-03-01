import {
    LOGIN_START,
    LOGOUT,
    USER_NAME_CHANGE,
    PASSWORD_CHANGE,
    SWITCH_AUTH_METHOD
} from "./actiontypes";

import {PWRightWid} from '../../constants';

export default (state = {
                        userNameTip: "手机号",
                        userName: "dahai",
                        userPWTip: "验证码",
                        userPW: "666666",
                        userToken: "",
                        changeBtnTitle: "使用账号密码登录",
                        PWRight: 0
                        }, 
                action) => {
    
    console.log("authentication reducer was called with action.type as: ", action.type);
    console.log("authentication reducer was called with action.data: ", action.data);
    //console.log("authentication reducer state.userName: ", state.logins.userName);
    //console.log("authentication reducer state.userPW: ", state.logins.userPW);

    switch(action.type) {
        case USER_NAME_CHANGE:
            return {...state, userName: action.data};
        case PASSWORD_CHANGE:
            return {...state, userPW: action.data};
        case SWITCH_AUTH_METHOD:
            return {...state, 
                PWRight: PWRight == PWRightWid ? 0 : PWRightWid, 
                userNameTip: PWRight == PWRightWid ? "手机号" : "账户",
                userPWTip: PWRight == PWRightWid ? "验证码" : "密码",
                changeBtnTitle: PWRight == PWRightWid ? "使用账号密码登录" : "使用手机号验证码登录" }
        case LOGIN_START:
            return state;
        case LOGOUT:
            return state;
        default:
            return state;
    }
    
}


