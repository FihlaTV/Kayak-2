var mysql = require('../models/mysql');
var Users = require('../models/users');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

function handleGoogleLogin(msg, callback) {
    var res = {};
    console.log('!!!!!!!!!!!! google auth!!!!!!!!!!!!!!!!!!');
    console.log("In signup handle request:"+ JSON.stringify(msg));
    console.log('profile id'+ msg.profile.id);
    console.log('profile name'+ msg.profile.displayName);
    console.log('profile email id'+ msg.profile.emails[0].value);
    var query= "SELECT email_id from google_table where ID= "+msg.profile.id+";";
    var query1 ="INSERT INTO google_table (ID , display_name, email_id) VALUES ("+ msg.profile.id+ ",'"+msg.profile.displayName+ "','"+msg.profile.emails[0].value+"');";

    mysql.fetchData(function (err, result) {
        if (err) {
            throw err;
        }
        else
        {
            callback(null,result);
            if(result === msg.profile.emails[0].value){
                console.log('user exists... ');
                res.value = 'user already exists';
            }
            else{
                mysql.fetchData(function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else
                    {
                        callback(null,result);
                    }
                }, query1);
            }
        }
    }, query);

    console.log("Google Done");
}

function handleFacebookLogin(msg, callback) {
    var res = {};
    console.log('!!!!!!!!!!!! facebook auth!!!!!!!!!!!!!!!!!!');
    console.log("In facebook signup handle request:"+ JSON.stringify(msg));
    console.log('profile id'+ msg.profile.id);
    console.log('accessToken'+ msg.accessToken);
    console.log('profile first name'+ msg.profile.displayName);
    var query= "SELECT first_name from facebook_table where ID= "+msg.profile.id+";";
    var query1 ="INSERT INTO facebook_table (ID , access_token, first_name) VALUES ("+ msg.profile.id+ ",'"+msg.accessToken+ " ',' "+msg.profile.displayName+" ');";
    mysql.fetchData(function (err, result) {
        if (err) {
            throw err;
        }
        else
        {
            callback(null,result);
            if(result === msg.profile.displayName){
                console.log('user exists... ');
                res.value = 'user already exists';
            }
            else{
                mysql.fetchData(function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else
                    {
                        callback(null,result);
                    }
                }, query1);
            }
        }
    }, query);

    console.log("Facebook Done");


}

function handleAddUser(userdetail, callback) {
    console.log("its userdetails in usermodel" + userdetail +" " + userdetail.userinfo.userName + userdetail.userinfo.password);
    var checkUser = "select * from users where email='" + userdetail.userinfo.userName + "'";
    mysql.fetchData(function (err, result) {
        if (err) {
            throw err;
        }
        else if (result.length>0) {
            console.log("user already ther");
            var response= {code:401,message:'User already exists'};
            callback(null,response);
        }
        else if (result.length===0) {

            var passwordToSave = bcrypt.hashSync(userdetail.userinfo.password, salt);
            var addUser = "INSERT INTO users(email,password) VALUES ('" + userdetail.userinfo.userName + "','" + passwordToSave + "')";
            console.log("query is" + addUser);
            mysql.fetchData(function (err, result) {
                if (err) {
                    throw err;
                    callback(null,response);
                }
                else {
                    var response = {result:result,code:201,message:'User Successfully Created'};
                    callback(null,response);
                }
            }, addUser);
        }
    }, checkUser);
}

function handleLoginUser (userdetail,callback){
    var findUser = "select * from users where email='" + userdetail.username + "'";
    mysql.fetchData(function(err,result){
        if(err){
            throw err;
        }
        else if(result.length == 0){
            console.log("user doesn't exist");
            var response= {code:401,message:'User doesnt exists'};
            callback(null,response);
        }
        else if(result.length > 0){
            var response= {code:201,result:result};
            callback(null,response);
        }
    },findUser);
}

exports.updateUser = function(data, callback){
    Users.updateUser( data , function(err , results){
        if(err){
            console.log("[Kafka] Error searching new user")
            callback(err,null);
        }else{

            //console.log("its result in user_services"+results + " "+ results.result[0]);
            callback(null,results);
        }
    });
};


module.exports.handleFacebookLogin = handleFacebookLogin;
module.exports.handleGoogleLogin = handleGoogleLogin;
module.exports.handleAddUser = handleAddUser;
module.exports.handleLoginUser = handleLoginUser;