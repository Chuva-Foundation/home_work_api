const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    const { path } = req;
    console.log(path);
    if (path === '/session') {
        jwt.verify(token, "bbef357897e532a60da4830fac13623e", (err, decoded) => {
            if (err) {
                return next();
            }
            req.userId = decoded.id;
            return res.redirect('/home');
        });
    } 
    jwt.verify(token, "bbef357897e532a60da4830fac13623e", (err, decoded) => {
        if (err) {
            return res.redirect('/session');
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = auth;