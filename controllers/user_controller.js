const User = require('../models/user');

module.exports.profile = function(req, res){
    // res.end('<h1>User Profile</h1>');
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('user_profile', {
                    title: "User Profile", 
                    user: user
                })
            }
            return res.redirect('/user/signin');
        });
    }
    else{
        return res.redirect('/user/signin');
    }
}

module.exports.posts = function(req, res){
    res.end('<h1>User Posts</h1>');
}

module.exports.signIn = function(req, res){
    return res.render('user_signIn', {
        title: 'SignIn'
    })
}

module.exports.signUp = function(req, res){
    return res.render('user_signUp',{
        title: 'SignUp'
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
                return res.redirect('/user/signin');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}

//get the signIn data

module.exports.createSession = function(req, res){
    //TODO later
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error finding user in SignIn');
            return;
        }
        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');
        } else{
            return res.redirect('back');
        }
    })
}