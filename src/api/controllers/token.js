var tokenCtrl  =  require('../repo/tokenRepo');
var userController =  require('../repo/userRepo');


exports.generateToken = function(user){
    var user_token={
        user:user
    }
    return token = jwt.sign(user_token, process.env.JWT_SECRET,{
        expiresIn: 60*5
    });
}
exports.deleteToken=function(res, rep){
    

    // tao chuoi refesttoken
    exports.createRefreshToken=function(us){
        var str = randomstring.generate(
            {
                length : 30,
                charset: 'alphabetic'
            }
        );
        return str+us;
    }
}
