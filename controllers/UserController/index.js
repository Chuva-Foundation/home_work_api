const connectDB = require('../../config/database');
const User = require('../../models/User');


const genders = ['male', 'female', 'other'];
const user_types = ['student', 'teacher'];

const getInfo =  async (req, res) => {
    const { userId} = req;
    const user = await User.getById(userId);

    res.status(200).json({ sucess: true, data: user });
};

const getAll =  async (req, res) => {
    const users = await User.getAll();
    res.status(200).json({ sucess: true, data: users });
};


const create = async (req, res) => {
    console.log(req.body);
    const { user_name, email, password, confirm_password, full_name, gender, user_type} = req.body;

    if (!full_name && !user_name && !email && !password && !confirm_password && !gender && !user_type) {
        return res.status(400).json({sucess: false, error: 'All the fields is required'});
    }

    if (full_name < 20 || full_name > 255) {
        return res.status(400).json({sucess: false, error: 'the field Full Name it requires at least 10 chars and at maximum 255 chars'});
    }

    if (user_name < 5 || user_name > 10) {
        return res.status(400).json({sucess: false, error: 'the User Name it requires at least 10 chars and at maximum 30 chars'});
    }

    if (password !== confirm_password) {
        return res.status(400).json({sucess: false, error: "the passwords doesn't match"});
    }

    if (password.length < 6 || password.length > 128) {
        return res.status(400).json({sucess: false, error: "the password is to long or to short"});
    }

    const gender_found = genders.find((gen) => gen === gender);
    if (!gender_found) {
        return res.status(400).json({sucess: false, error: "The gender that the user has provided is not allowed"});
    }

    const userT_found = user_types.find((ust) => ust === user_type);
    if (!userT_found) {
        return res.status(400).json({sucess: false, error: "The user_type that the user has provided is not allowed"});
    }
    

    const user = await User.create(user_name, email, password, full_name, gender, user_type);

    res.status(201).json({sucess: true, user: user});

};


const update = async (req, res) => {
    const {userId} = req;
    const {user_name, email, password, confirm_password, full_name} = req.body;
    if (user_name) {
        console.log(user_name);
        if (user_name.length < 5 || user_name.length > 10) {
            return res.status(400).json({sucess: false, error: 'the User Name it requires at least 10 chars and at maximum 30 chars'});
        }
    }

    if (full_name) {
        if (full_name < 10 || full_name > 255) {
            return res.status(400).json({sucess: false, error: 'the field Full Name it requires at least 10 chars and at maximum 255 chars'});
        }
    }

    if (password) {
        if (password !== confirm_password) {
            return res.status(400).json({sucess: false, error: "the passwords doesn't match"});
        }
        if (password.length < 6 || password.length > 128) {
            return res.status(400).json({sucess: false, error: "the password is to long or to short"});
        }
    }

    const user = await User.update(userId, user_name, email, password, full_name);
    res.status(200).send("Sucess");
};

const deleteUsr = async (req, res) => {
    const { userId } = req;
    const deleted = await User.delete(userId);
    if (deleted) {
        return res.status(200).json({sucess: true, msg: "User deleted with sucess"});
    }

    res.status(400).json({sucess: false,error: "Cannot delete user"});
};


module.exports = { create, update, deleteUsr, getInfo, getAll }; 