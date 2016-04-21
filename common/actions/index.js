/**
 * Created by amita on 4/20/2016.
 */
import {constObj} from '../constants/loginConstants.js'
const {LOGIN_REQUEST,LOGIN_FAILURE,LOGIN_SUCCESS,LOGOUT}=constObj;
export function loginRequest(){
    return {
        type:LOGIN_REQUEST

    }
}

export function loginSuccess(accessToken){
    console.log('accessToken',accessToken);
    return {
        type:LOGIN_SUCCESS,
        payload:{
            accessToken:accessToken
        }
    }
}

export function loginFail(errorObj){
    console.log('errorObj',errorObj);
    return {
        type:LOGIN_FAILURE,
        payload:{
            status:errorObj.status,
            statusText:errorObj.message
        }
    }

}

export function logout(){
    return {
        type:LOGOUT
    }
}

