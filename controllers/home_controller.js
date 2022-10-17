module.exports.home = function(req, res){
    // return res.end('<h1>EXPRESS is ready for CODEIAL</h1>');
    console.log(req.cookies);
    return res.render('home', {
        title: "Home"
    });
}