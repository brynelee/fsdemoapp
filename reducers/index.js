import {reducer as AthnReducer } from "./authenticationReducer";
import LoginModel from "../model/LoginModel";

const initialState = () => {
    return { loginModel: LoginModel()}
}

export const reducer = (state = initialState(), action) => {

    return {
        loginModel: 
    }
}