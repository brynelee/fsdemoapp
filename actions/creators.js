import {
    LOGIN,
    LOGOUT
} from "./types";

import { LoginModel } from "../model/LoginModel";

export const loginAction = (username, password) => {
    console.log("loginAction action creator was called ...");
    return {type: LOGIN, data: LoginModel({username, password})};
}