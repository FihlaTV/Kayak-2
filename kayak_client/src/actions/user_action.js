import { userConstants } from '../constants';
import { userapi} from '../api/userAPI';
import { alert_actions } from './alert_action';
import {history,saveServerToken} from "../utils/util";
export const useraction={
    signin_action,
    signup_action,
    setUser_action,
    checkSession,
    logout
};

function signin_action(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userapi.signinAPI(email, password)
            .then(
                response => {
                    if(response.status===201)
                    {
                        response.json().then((response) => {
                            console.log(response.message);
                            console.log("its"+response);
                            //dispatch(success(response));
                            dispatch(checkSession());
                            history.push('/flights');
                        });
                    }
                    else
                    {
                        dispatch(failure(response.message));
                        dispatch(alert_actions.error(response.message));
                    }
                } );
    };

    function request(user) { return { type: 'LOGIN_REQUEST', user } }
    function success(user) { return { type: 'LOGIN_SUCCESS', user } }
    function failure(error) { return { type: 'LOGIN_FAILURE', error } }
}

function signup_action(user) {
    return dispatch => {
        userapi.signupAPI(user)
            .then(
                response => {
                    if(response.status===201)
                    {
                        response.json().then((response) => {
                            console.log(response.message);
                            console.log("its"+response);
                            //dispatch(success(response));
                            dispatch(checkSession());
                            history.push('/flights');
                        });
                    }
                    else
                    {
                        dispatch(failure(response.message));
                        dispatch(alert_actions.error(response.message));
                    }
                });
    };
    function success(user) { return { type: 'REGISTER_SUCCESS', user } }
    function failure(error) { return { type: 'REGISTER_FAILURE', error } }
}
function setUser_action(email)
{
    console.log("its set user action");
    return dispatch => {
        dispatch(setUser({user_id:email}));
    };
    function setUser(result){return { type :'SET_USER',result }}
}

function checkSession() {
    return dispatch => {
        userapi.checkSessionAPI()
            .then(
                response => {
                    if(response.status===200)
                    {

                        response.json().then((response) => {
                            console.log("tell me"+response.user_id);
                            // if(response.code===200)
                            // {
                            //     dispatch(success(response));
                            //     saveServerToken(user.username);
                            //     history.push('/flights');
                            // }
                            // else
                            // {
                            //     dispatch(failure(response.message));
                            // }
                            dispatch(success(response));
                        });
                    }
                    else {
                        //dispatch(failure(response.message));
                    }
                }
            );
    };
    function success(result) { return { type: 'SET_USER', result } }
}

function logout() {
    return dispatch => {
        userapi.logout()
            .then(
                response => {
                    if(response.status===200)
                    {

                        response.json().then((response) => {
                            console.log("logged out");
                            // if(response.code===200)
                            // {
                            //     dispatch(success(response));
                            //     saveServerToken(user.username);
                            //     history.push('/flights');
                            // }
                            // else
                            // {
                            //     dispatch(failure(response.message));
                            // }
                            dispatch(success(response.user_id));
                        });
                    }
                    else {
                        //dispatch(failure(response.message));
                    }
                }
            );
    };
    function success(result) { return { type: 'SET_USER', result } }
}