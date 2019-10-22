const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024
    }
});


function redirectIfLogged(req, res, next) {
    if (req.user) return res.redirect('/users/account');
    return next();
}

module.exports.upload = upload;
module.exports.redirectIfLogged = redirectIfLogged;