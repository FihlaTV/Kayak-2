var mysql = require('./mysql');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);


function addNewAdmin(admindetail, callback) {
    console.log("admin detail" + admindetail.username + admindetail.password);
    var checkAdmin = "select * from admin where username='" + admindetail.username + "'";
    mysql.fetchData(function (err, result) {
        if (err) {
            throw err;
        }
        else if (result.length>0) {
            console.log("admin already exists");
            var response= {code:401,message:'Admin already exists'};
            callback(null,response);
        }
        else if (result.length=== 0) {
            var passwordToSave = bcrypt.hashSync(admindetail.password, salt);
            var addAdmin = "insert into admin (username,password) values ('" + admindetail.username + "','" + passwordToSave + "')";
            console.log("query is" + addAdmin);
            mysql.fetchData(function (err, result) {
                if (err) {
                    throw err;
                    callback(null,{code:404,message:'Failed to add new admin try again later'});
                }
                else {
                    console.log("executed Successfully");
                    var response = {result:result,code:201,message:'Admin Successfully Created'};
                    callback(null,response);
                }
            }, addAdmin);
        }
    }, checkAdmin);
}

// exports.adminSignIn = function(data, callback){
//     console.log("adminSignIn:data",data);
//     var adminDetail = {
//         username:data.admininfo.username,
//         password:data.admininfo.password
//     };
//     Admin.adminSignIn( adminDetail , function(err , results){
//         if(err){
//             console.log("[Kafka] Error in siging in admin")
//         }
//         console.log("its result in admin services signin"+results);
//         callback(err,results);
//     });
// };
function adminSignIn(admindetail, callback) {
    console.log("admin detail" + admindetail.username + admindetail.password);
    var checkAdmin = "select * from admin where username='" + admindetail.username + "' AND password='"+ admindetail.password + "';";
    mysql.fetchData(function (err, result) {
        if (err) {
            throw err;
        }else if (result.length>0) {
            console.log("sql result",result);
            var res_result={};
            // res_result.status = 401;
            // if(bcrypt.compareSync(admindetail.password, result[0].password)){
            //     //const server_token = jwt.sign({uid:result[0].id},utils.server_secret_key);
            //
            //     //res_result.servertoken = server_token;
            //     //res_result.userinfo = {firstname:result[0].firstname,
            //     //               username:result[0].email
            //     //             };
                res_result.message = "User logged in ... ";
                res_result.status = 201;
                res_result.result={car_sales:100,flight_sales:10,hotel_sales:20,user_booking:30};
                console.log("user signed in ");
            }else{
                res_result.message = "Wrong password !!!";
            }
            callback(null,res_result);

    }, checkAdmin);
}

module.exports.addNewAdmin = addNewAdmin;
module.exports.adminSignIn = adminSignIn;
