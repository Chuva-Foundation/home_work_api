const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const create = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({success: false, msg: "Email not provided"});
    }
    
    const user = await User.getByEmail(email);
    if (!user) {
        return res.status(404).json({success: false, error: "User does not exist"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({success: false, error: "Password Incorrect"});
    }

    res.status(200).json({ success: true, token: jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1d'})});
}

module.exports = {create};