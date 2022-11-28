const jwt = require('jsonwebtoken');
require('dotenv').config();


const auth = (req, res, next) => {
    try {
        var { authorization } = req.headers;
    } catch (err) {
        console.log('User does not have the token');
        console.log(err.message);
    }
    finally {
        const { path } = req;
        if (!authorization) {
            if (path === '/log_in') {
                return next();
            } 
            return res.status(400).json({success: false, error: "Not authorizated"});
        } 
        
        const [, token] = authorization.split(' ');
        

        if (path === '/log_in') {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return res.status(400).json({success: false, error: "Not authorizated"});
                }
                req.userId = decoded.id;
                return res.redirect('/user');
            });
        } 
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({success: false, error: "Not authorizated"});
            }
            req.userId = decoded.id;
            next();
        });
    }
}

module.exports = auth;