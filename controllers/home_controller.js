const Post = require('../models/post');

module.exports.home = function(req, res){
    // return res.end('<h1>EXPRESS is ready for CODEIAL</h1>');
    // console.log(req.cookies);
    Post.find({}, function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });
}