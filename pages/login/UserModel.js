export default class UserModel {

    constructor(username, password){
        this.username = username;
        this.password = password;
        this.userId = '';
        this.userToken = '';
    }

    setFromObject(ob){
        this.username = ob.username;
        this.password = ob.password;
        this.userId = ob.userId;
        this.userToken = ob.userToken;
    }
};

export const LOGIN_STATUS_LOADING = 'loading';
export const LOGIN_STATUS_SUCCESS = 'success';
export const LOGIN_STATUS_FAILURE = 'failure';
