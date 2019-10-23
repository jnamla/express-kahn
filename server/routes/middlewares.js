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

module.exports.handleAvatar = avatars => async(req, res, next) => {
    if(!req.file) return next();
    if(req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg') {
        return next(new Error('File format is not supported'));
    }
    req.file.storedFilename = await avatars.store(req.file.buffer);
    return next();
}
