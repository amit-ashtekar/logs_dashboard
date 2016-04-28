/**
 * Created by amita on 3/15/2016.
 */

import {loginRequest,loginFail,loginSuccess,logout} from '../actions';


export function login(username,password,successCB){
    return function (dispatch) {
        let config={
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {  'Content-Type': 'application/json', 'Accept': 'application/json' }
        };
        dispatch(loginRequest());
        return fetch('http://localhost:3001/auth/getToken',config)
                .then(res=>
            res.json()
        )
        .then(resJson=> {
            if(!resJson["access_token"])
        {
            dispatch(loginFail(resJson.message))
        }
        else{
            console.log("resppnse: ",resJson);

            dispatch(loginSuccess(resJson))

                if(successCB)
                successCB(resJson,dispatch);
        }
    }).catch(err=>{
        dispatch(loginFail({status:"403",message:err}));
                   })

}
}
