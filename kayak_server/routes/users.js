var express = require('express');
var bcrypt = require('bcrypt');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');
var kafka = require('./../kafka/client');
var session;

var router = express.Router();
const saltRnd = 3;

passport.use('login',new LocalStrategy(
    function(username, password, done) {
        console.log("LocalStrategy Username: ",username,"password: ",password);
        var res_result = {message:'',
            servertoken:'',
            status:401
        };
        kafka.make_request('signin',{"username":username}, function(err,result){
            if(err){
                throw err;
            }else{
                console.log("login result:",result );
                console.log(result.result[0].password);
                if(result){
                    if(bcrypt.compareSync(password, result.result[0].password)){
                        //const server_token = jwt.sign({uid:result.result[0].email},"aqswdefrgthyjukilop");
                        //res_result.servertoken = server_token;
                        res_result.userinfo = {
                            username:result.result[0].email,
                            first_name: result.result[0].first_name,
                            last_name: result.result[0].last_name,
                            gender: result.result[0].gender,
                            address: result.result[0].address,
                            city: result.result[0].city,
                            state: result.result[0].state,
                            zip: result.result[0].zip
                        };
                        res_result.message = "User logged in ... ";
                        res_result.status = 201;
                    }else{
                        res_result.message = "Wrong password !!!";
                    }
                    done(null,res_result);
                }else{
                    res_result.message = "User does not exists !!!";
                    done(null,res_result);
                }
            }
        });
    }));

router.post('/logout', function (req, res) {
    console.log('logout is being called');
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.send({status:200})
        }
    })});


router.post('/login', function(req, res, next) {
    console.log("req is:"+req.body.username);
    passport.authenticate('login', function(err, result) {
        console.log("in login"+result.status + "ggu"+result.userinfo.first_name);
        if(!err && result.status === 201) {
            session= req.body;
            session.username = result.userinfo.username;
            session.first_name = result.userinfo.first_name;
            session.last_name = result.userinfo.last_name;
            session.gender= result.userinfo.gender;
            session.address= result.userinfo.address;
            session.city= result.userinfo.city;
            session.state= result.userinfo.state;
            session.zip= result.userinfo.zip;
            //session.save();
            console.log(session.username);
            return res.status(201).json(result);

        }else{
            return res.status(401).json(result);
        }

    })(req, res);

});

router.post('/checkSession', function (req, res){
    if(session.username) {
        console.log(session.username);
        return res.status(200).json({user_id: session.username, first_name: session.first_name, last_name:session.last_name, gender:session.gender, address:session.address, city:session.city, state:session.state, zip:session.zip});
        //res.json(,status:200});
    }
    else
        res.status (408).send();

});




router.post('/signup',function(req, res, next){
    var res_result = {message:'',
        servertoken:''
    };
    var userinfo = {};
    userinfo.userName = req.body.username;
    userinfo.password = req.body.password;

    kafka.make_request('signup',{"userinfo":userinfo}, function(err,result){
        if(!err){
            session= req.body;
            session.username = req.body.username;
            //console.log("user signed up ",result);
            res.status(201).json(result);
        }else{
            res.status(401).json({});
        }
    });
});


router.post('/adduser',function(req, res, next){
    var userinfo = {};
    userinfo.email = req.body.email;
    userinfo.password = req.body.password;
    userinfo.first_name = req.body.first_name;
    userinfo.last_name = req.body.last_name;
    userinfo.address = req.body.address;
    userinfo.city = req.body.city;
    userinfo.state = req.body.state;
    userinfo.zip = req.body.zip;
    userinfo.phone = req.body.phone;

    kafka.make_request('add_user', userinfo , function(err,result){
        if(!err){
            //console.log("user signed up ",result);
            if(result.code === 201){
                res.status(201).json(result);
            }
            else if(result.code === 401){
                res.status(401).json(result);
            }
        }else{
            res.status(403).json({});
        }
    });
});

router.post('/searchuser',function(req, res, next){
    var userinfo = {};
    userinfo.email = req.body.email;

    kafka.make_request('search_user', userinfo , function(err,result){
        if(!err){
            console.log('result*****',result);
            //console.log("user signed up ",result);
            if(result.code === 201){
                res.status(201).json(result);
            }
        }else{
            res.status(401).json({});
        }
    });
});


router.post('/updateuserdetails',function(req, res, next){
    var userinfo = {};
    userinfo.email = req.body.user_id;
    userinfo.first_name = req.body.first_name;
    userinfo.last_name = req.body.last_name;
    userinfo.address = req.body.address;
    userinfo.city = req.body.city;
    userinfo.zip = req.body.zip;
    userinfo.state = req.body.state;



    kafka.make_request('update_user', userinfo , function(err,result){
        if(!err){
            console.log('result*****',result);
            //console.log("user signed up ",result);
            session.username = result[0].email;
            session.first_name = result[0].first_name;
            session.last_name = result[0].last_name;
            session.gender= result[0].gender;
            session.address= result[0].address;
            session.city= result[0].city;
            session.state= result[0].state;
            session.zip= result[0].zip;
            if(result){
                res.status(201).json(result);
            }
        }else{
            res.status(401).json({});
        }
    });
});

router.post('/deleteuser',function(req, res, next){
    var userinfo = {};
    userinfo.email = req.body.email;

    kafka.make_request('delete_user', userinfo , function(err,result){
        if(!err){
            console.log('result*****',result);
            //console.log("user signed up ",result);
            if(result.code === 201){
                res.status(201).json(result);
            }
        }else{
            res.status(401).json({});
        }
    });
});

passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientId,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL
    }, function (accessToken, refreshToken, profile, done) {
        console.log('inside passport use : ' + accessToken);
        console.log('accessToken' , accessToken, 'refreshToken', refreshToken, 'profile',profile);
        kafka.make_request('facebook_login', {"accessToken": accessToken, "refreshToken": refreshToken, "profile":profile}, function (err,results) {
            console.log('in result' + results);
            if(err) {
                console.log(err);
            }
            else {
                if( results.code ===  '200'){
                    console.log('user found');
                    return done(results);
                }
                else {
                    //res.send({status: 408, message: " issue with flight entry"});
                    results.code = '404';
                    return done(null,results.code);
                }

            }
        });

    }
    )
);

passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientId,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    }, function (accessToken, refreshToken, profile, done) {
        console.log('inside passport use : ' + accessToken);
        console.log('accessToken' , accessToken, 'refreshToken', refreshToken, 'profile',profile);
        kafka.make_request('google_login', {"accessToken": accessToken, "refreshToken": refreshToken, "profile":profile}, function (err,results) {
            console.log('in result' + results);
            if(err) {
                console.log(err);
            }
            else {
                if( results.code ===  '200'){
                    console.log('user found');
                    return done(results);
                }
                else {
                    //res.send({status: 408, message: " issue with flight entry"});
                    results.code = '404';
                    return done(null,results.code);
                }

            }
        });

    }
    )
);

router.get('/auth/facebook',function (req,res,next) {
    passport.authenticate('facebook', {scope: ['email']})(req,res,next);
});

router.get('/auth/facebook/callback',function (req, res, next) {
    passport.authenticate('facebook', function (err, result) {
        console.log('inside passport authenticate:'+ result);
        if (!err && result.status === 200) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json(result);
        }
    })(req, res,next);
});

router.get('/auth/google',passport.authenticate('google', { scope : ['profile','email']}));

router.get('/auth/google/callback' ,
    passport.authenticate('google', function (err,result) {
        console.log('inside google authenticate' + result);
        if( !err && result.status === 200){
            return result;
        } else {
            return result.status;
        }
    }));

module.exports = router;
