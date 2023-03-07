const User = require('../models/user');

module.exports.profile = function(req, res){
    // res.end('<h1>User Profile</h1>');
    
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
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
    // req.flash('success', 'Logged In successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    // req.flash('success', 'Logged Out successfully');
    return res.redirect('/');
}