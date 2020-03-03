export class UserModel {

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
};

export const LOGIN_STATUS_LOGOUT = 'logout';
export const LOGIN_STATUS_LOADING = 'loading';
export const LOGIN_STATUS_SUCCESS = 'success';
export const LOGIN_STATUS_FAILURE = 'failure';
