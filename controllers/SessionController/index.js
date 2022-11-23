const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const create = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({sucess: false, msg: "Email not provided"});
    }
    
    const user = await User.getByEmail(email);
    if (!user) {
        return res.status(404).json({sucess: false, error: "User does not exist"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({sucess: false, error: "Password Incorrect"});
    }

    res.status(200).json({ sucess: true, token: jwt.sign({id: user.id}, "bbef357897e532a60da4830fac13623e", {expiresIn: '1d'})});
}

module.exports = {create};