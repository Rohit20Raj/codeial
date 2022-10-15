module.exports.home = function(req, res){
    // return res.end('<h1>EXPRESS is ready for CODEIAL</h1>');
    return res.render('home', {
        title: "Home"
    });
}