var express = require('express');
var router = express.Router();
var mysql =require('./mysql');
// var passwordHash = require('password-hash');
var passport = require('passport');
require('./passportLocal')(passport);
//var mongoose = require('./mongoose');
var session;
var kafka = require('./kafka/client');




module.exports = function (app) {

    app.use(passport.initialize());

    router.post('/api/doLogin', function(req, res) {
        console.log(req.body);
        passport.authenticate('login', function(err, user,info) {
            console.log(user);
            console.log(info);
            if(err) {
                res.status(500).send();
                console.log('error');
            }

            if(!user) {
                console.log('error1');
                res.send(info);
            }
            else{
                session= req.session;
                session.email = user.results.email;
                session.edu = user.results.edu;
                session.work= user.results.work;
                session.interest= user.results.interest;
                session.save();
                console.log("Session initialized");
                res.send({ message: 'logged in',
                    email: user.results.email});
            }
        })(req,res);

        // MySQL Code
        //var getUser="select * from info where email='"+email+"'";
        // mysql.fetchData(function(err,results){
        //     if(err){
        //         throw err;
        //     }
        //     else {
        //         console.log(results);
        //         if(!results.length){
        //             res.send({message: "user does not exist"});
        //         }
        //         else{
        //             console.log(pwd);
        //             var check = passwordHash.verify(pwd, results[0].pwd);
        //             console.log(check);
        //             console.log(results[0].pwd);
        //             if (check === true) {
        //                 session= req.session;
        //                 session.email = email;
        //                 session.save();
        //                 console.log("Session initialized");
        //                 res.send({
        //                     message: "logged in",
        //                     email: results[0].email
        //                 });
        //             }
        //             else{
        //                 res.send({message: "password incorrect"});
        //             }
        //         }
        //     }
        // },getUser);
        //***************************************************************************************

    });
    

    router.post('/api/doRegister', function (req, res) {
        console.log('doRegister is being called');
        console.log(req.body);
        // var fname = req.body.formData.Fname;
        // var lname = req.body.formData.Lname;
        // var email = req.body.formData.email;
        //var pwd = req.body.password;
        // console.log(fname);
        // console.log(lname);
        // console.log(email);
        // console.log(pwd);
        //var hashedPassword = passwordHash.generate(pwd);

        // MySQL Code
        // var insertUser="insert into info (fname, lname, email, pwd) values ( '"+ fname +"','" + lname +"','" + email +"','" + hashedPassword + "');" ;
        // console.log(insertUser);
        // mysql.insertData(function(err,results){
        //     if(err){
        //         throw err;
        //     }
        //     else {
        //         res.send({message:"User Registered!!"});
        //
        //     }
        //
        // },insertUser);
        //***************************************************************************************

        // Without using passport
        // var newUser = mongoose.UserData();
        // newUser.fname = fname;
        // newUser.lname = lname;
        // newUser.email = email;
        // newUser.pwd = hashedPassword;
        //
        // newUser.save(function (err, savedUser) {
        //     if(err)
        //     {
        //         console.log(err);
        //         return res.status(500).send();
        //     }
        //     return res.status(200).send({message:"User Registered!!"})
        // });
        //****************************************************************************************


        passport.authenticate('register', function(err, user,info) {
            console.log(user);
            console.log(info);
            if(err) {
                res.status(500).send();
                console.log('error');
            }

            if(!user) {
                console.log('error1');
                res.send(info);
            }
            else{
                return res.status(200).send({message:"User Registered!!"})
            }
        })(req,res);
    });


    app.use('/users',router);
};