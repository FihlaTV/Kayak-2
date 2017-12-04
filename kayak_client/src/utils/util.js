import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const saveServerToken = (userdata, servertoken, type) => {
    console.log("saveServerToken",userdata);
    if(type === "user"){
        localStorage.setItem('currentUser',JSON.stringify(userdata));
        localStorage.setItem('userServertoken',servertoken);
    }
    if(type === "admin"){
        localStorage.setItem('currentAdmin',JSON.stringify(userdata));
        localStorage.setItem('adminServertoken',servertoken);
    }

};

export const getAdminDetails=()=>{
    return (localStorage.currentAdmin.username?localStorage.currentAdmin.username:null);
}

export const getUserDetails=()=>{
    return (localStorage.currentUser.username?localStorage.currentUser.username:null);
}

export const deleteServerToken = (usertype) => {
    if(usertype === "admin"){
        localStorage.removeItem('currentAdmin');
        localStorage.removeItem('adminServertoken');
    }else if(usertype === "user"){
        localStorage.removeItem('currentUser');
        localStorage.removeItem('servertoken');
    }
};

export const getUserHTTPHeader = function(){
    var header = {
        ...headers,
        servertoken:localStorage.userServertoken?localStorage.userServertoken:null
    }
    return header;
};

export const getAdminHTTPHeader = function(){
    var header = {
        ...headers,
        servertoken:localStorage.adminServertoken?localStorage.adminServertoken:null
    }
    return header;
};