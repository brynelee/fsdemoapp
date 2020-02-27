export default class LoginModel {

    constructor(username, password){
        this.username = username;
        this.password = password;
        this.userId = null;
        this.userToken = null;
    }

    setFromObject(ob){
        this.username = ob.username;
        this.password = ob.password;
        this.userId = ob.userId;
        this.userToken = ob.userToken;
    }
};
