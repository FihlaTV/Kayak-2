var mysql = require('./mysql');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
function addNewUser(userdetail, callback) {
    console.log("its userdetails in usermodel" + userdetail.username + userdetail.password);
    var checkUser = "select * from users where email='" + userdetail.username + "'";
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
            var passwordToSave = bcrypt.hashSync(userdetail.password, salt);
            var addUser = "INSERT INTO users(email,password) VALUES ('" + userdetail.username + "','" + passwordToSave + "')";
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

function addNewUserAdmin(userdetail, callback) {

    var checkUser = "select * from users where email='" + userdetail.email + "'";
    mysql.fetchData(function (err, result) {
        if (err) {
            throw err;
        }
        else if (result.length>0) {
            console.log("user already there");
            var response= {code:401,message:'User already exists'};
            callback(null,response);
        }
        else if (result.length==0) {
            var passwordToSave = bcrypt.hashSync(userdetail.password, salt);
            var addUser = "INSERT INTO users(email,password,first_name,last_name,address,city,state,zip,phone) VALUES ('" + userdetail.email + "','" + passwordToSave + "','" +userdetail.first_name+ "','" + userdetail.last_name+ "','" + userdetail.address+ "','" + userdetail.city+ "','" +userdetail.state+"','"+ userdetail.zip+ "','" + userdetail.phone+"')";
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

function searchUser (userdetail,callback){
    var findUser = "select * from users where email='" + userdetail.email + "'";
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

function updateUser (userdetail,callback){
    var updateUser = "UPDATE users SET first_name = '"+userdetail.first_name+"',"+
        "last_name = '"+userdetail.last_name+"',"+
        "address = '"+userdetail.address+"',"+
        "city = '"+userdetail.city+"',"+
        "state = '"+userdetail.state+"',"+
        "zip = '"+userdetail.zip+"'"+
        "where email='"+userdetail.email+"'";

    var query ="Select * from users where email='"+userdetail.email+"'";

    mysql.fetchData(function(err,result){
        if(err){
            throw err;
        }
        else{
            //console.log("Mysql"+result[0].city);
            mysql.fetchData(function (err, result1) {
                if (err) {
                    throw err;
                }
                else {
                    console.log("Mysql1"+result1[0].city);
                    //var response = {result:result,code:201,message:'User Successfully Created'};

                    callback(null,result1);
                }
            }, query);

            //callback(null,response);
        }
    },updateUser);

}

function deleteUser (userdetail,callback){
    var deleteUser = "delete from kayak_database.users where email='"+userdetail.email+"'";

    mysql.fetchData(function(err,result){
        if(err){
            throw err;
        }
        else{
            var response= {code:201,result:result};
            callback(null,response);
        }
    },deleteUser);

}




module.exports.addNewUser = addNewUser;
module.exports.searchUser = searchUser;
module.exports.addNewUserAdmin = addNewUserAdmin;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
