const User = require('../models/user');

module.exports.profile = function(req, res){
    // res.end('<h1>User Profile</h1>');
    return res.render('user_profile',{
        title: 'Profile'
    });
}

module.exports.posts = function(req, res){
    res.end('<h1>User Posts</h1>');
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('user_signIn', {
        title: 'Sign-In'
    })
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('user_signUp',{
        title: 'Sign-Up'
    })
}

//get the signUp data

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in creating user while signing up');
                    return;
                }
                return res.redirect('/user/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}

//get the signIn data
// sign in and create a session for the user

module.exports.createSession = function(req, res){
    //TODO later
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/');
    });

    return res.redirect('/');
}