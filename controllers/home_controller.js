const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (req, res) {
    // return res.end('<h1>EXPRESS is ready for CODEIAL</h1>');
    // console.log(req.cookies);
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // Populate the user of each post
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function (err, posts) {
            User.find({}, function (err, users) {
                return res.render('home', {
                    title: "Home",
                    posts: posts,
                    all_user: users
                });
            });
        });
}