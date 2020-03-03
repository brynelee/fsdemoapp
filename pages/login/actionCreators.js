import {
    LOGIN_FAILURE,
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_START,
    USER_NAME_CHANGE,
    PASSWORD_CHANGE,
    SWITCH_AUTH_METHOD
} from "./actiontypes";

import { UserModel } from "./UserModel";

/* class UserModel {

    constructor(username, password, userToken){
        console.log("constructor UserModel, userToken: ", userToken);
        this.username = username;
        this.password = password;
        this.userToken = userToken;
    }

    setFromObject(ob){
        this.username = ob.username;
        this.password = ob.password;
        this.userToken = ob.userToken;
    }
} */

export const loginStart = (username, password) => {
    console.log("loginStart action creator was called with username and password as: ", username, password);
    return {type: LOGIN_START, data: {username, password}};
}

export const loginSuccess = (usermodel) => {
    console.log("loginSuccess action creator was called with usermodel: ", usermodel);
    return {type: LOGIN_SUCCESS, data: usermodel};
}

export const loginFailure = (error) => {
    console.log("loginFailure action creator was called with error: ", error);
    return {type: LOGIN_FAILURE, data: error};
}

export const userNameChange = (username) => {
    console.log("userNameChange action creator was called, with username: ", username);
    return {type: USER_NAME_CHANGE, data: username};
}

export const passwordChange = (password) => {
    console.log("passwordChange action creator was called with password: ", password);
    return {type: PASSWORD_CHANGE, data: password};
}

export const switchAuthMethod = () => {
    console.log("switch auth method action was called ...");
    return {type: SWITCH_AUTH_METHOD};
}

export const logoutAction = () => {
    console.log("logoutAction creator was called ...");
    return {type: LOGOUT};
}

 /*
  Login Response Payload definition in usercenter
  
  error code definition：
      0x1 - login success
      0x2 - password is not correct
      0x3 - user not exist
      0x4 - token expired
  

  public static final int LOGIN_SUCCESS = 0x1;
  public static final int PASSWORD_INCORRECT = 0x2;
  public static final int USER_NOT_EXIST = 0x3;
  public static final int TOKEN_EXPIRED = 0x4;

  public static final String MSG_PASSWORD_INCORRECT = "Password provided is incorrect.";
  public static final String MSG_USER_NOT_EXIST = "User not exist, please verify or register.";
  public static final String MSG_TOKEN_EXPIRED = "Token expired.";

  public int errorCode;
  public String errorMessage;
  public String username;
  public String userToken;

  */

export const loginConnect = (username, password, nav) => {

    return (dispatch) => {
        
        console.log("loginConnect Aync action creator called ...");
        console.log("loginConnect - username: ", username);
        console.log("loginConnect - password: ", password);

        let urlLogin = 'http://192.168.3.127:8081/usercenter/login';
        
        //let params = 'username=dahai&password=666666';
        let params = 'username=' + username + '&password=' + password;
        console.log("loginConnect fetch parameters are: ", params);

        //let usermodel = new UserModel('dahai', '666666');
        //console.log("usermodel now is: ", usermodel);

        // dispatch loginStart action
        dispatch(loginStart(username, password));

        fetch(urlLogin, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            credentials: 'include', // for cross origin setup
            headers: {
              //'Content-Type': 'application/json; charset=UTF-8'
              'Content-Type': 'application/x-www-form-urlencoded' // Java server 不能识别Fetch API 中发出json的方式
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: params // body data type must match "Content-Type" header
        }).then((response) => {

            if(response.status !== 200){
                console.error('Fail to get response with status ' + response.status);
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJson) => {

                console.log("loginConnect - responseJson: ", responseJson);
                
                let userToken = responseJson.userToken;
                let usermodel = new UserModel(username, password, userToken);
                let errorcode = parseInt(responseJson.errorCode);
                let errorMessage = responseJson.errorMessage;
                //let userToken = responseJson.userToken;
        
                switch (errorcode) {
        
                  case 1: //login success, proceed with token proccesing
                  case 4: //token expired, proceed with token proccessing (save the new token too)
                    console.log("login responded successfully with usermodel: ", usermodel);
                    
                    //login successfully, save the user info and route to userhome page

              /*      this.state.userName = responseJson.username;
                    this.state.userToken = responseJson.userToken;
        
                    this.setState({ 'userName': responseJson.username, 'userToken': responseJson.userToken });
        
                    user.userToken = resp.data.userToken;
                    user.username = resp.data.username;
                    localStorage.setItem('token', user.userToken);
                    // 每次请求接口时，需要在headers添加对应的Token验证
                    axios.defaults.headers.common['Authorization'] = user.userToken;
                    // 更新token
                    commit('auth_success', user);
                    console.log("Store: the response username is ", user.username);
                    console.log("Store: the state.user is ", this.state.user);
                    */

                    //dispatch(loginSuccess({username, password, userToken}));
                    dispatch(loginSuccess(usermodel));
                    nav.navigate("UserArea", {screen: "UserHome"});

                    break;
        
                  case 2: //password is incorrect, need to tell the user to input again
                    //errorMessage = resp.data.errorMessage;
                    console.log(errorMessage);
                    dispatch(loginFailure(new Error("password is incorrect")));
                    //commit('auth_passwordincorrect');
                    break;
        
                  case 3: //user does not exist, need to tell the user to input again or register
                    //errorMessage = resp.data.errorMessage;
                    console.log(errorMessage);
                    dispatch(loginFailure(new Error("User does not exist.")));
        
                }

            }).catch((error) => {
                console.error('Invalid json response: ' + error);
                throw new Error('Invalid json response: ' + error);
            });
        }).catch((error) => {
            console.log("login fetch catched error: ", error);
            dispatch(loginFailure(error));
        })

    };
}


export const logout = (userName, userToken, nav) => {

    return (dispatch) => {
        
        console.log("logout Aync action creator called ...");
        console.log("logout action creator was called with username:", userName, " and userToken: ", userToken);
        //console.log("loginConnect - username: ", username);
        //console.log("loginConnect - password: ", password);

        let urlLogout = 'http://192.168.3.127:8081/usercenter/logout';
                
        let params = 'username=' + userName + '&token=' + userToken;
        console.log("logout fetch parameters are: ", params);

        fetch(urlLogout, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            credentials: 'include', // for cross origin setup
            headers: {
              //'Content-Type': 'application/json; charset=UTF-8'
              'Content-Type': 'application/x-www-form-urlencoded' // Java server 不能识别Fetch API 中发出json的方式
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: params // body data type must match "Content-Type" header
        }).then((response) => {

            if(response.status !== 200){
                console.error('Fail to get response with status ' + response.status);
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJson) => {

                console.log("logout - responseJson: ", responseJson);
                
                let errorcode = parseInt(responseJson.errorCode);
        
                switch (errorcode) {
        
                  case 1: //logout success, proceed with token proccesing
                    console.log("logout successfully.");
                    dispatch(logoutAction());
                    nav.navigate("Home");
                    break;
                  case 2: //token expired, proceed with token proccessing (save the new token too)
                    console.log("logout with token error");
                    dispatch(logoutAction());
                    break;
        
                }
                
            }).catch((error) => {
                console.error('Invalid json response: ' + error);
                throw new Error('Invalid json response: ' + error);
            });
        }).catch((error) => {
            console.log("logout fetch catched error: ", error);
            throw new Error('logout error: ' + error);
        })

    };

}