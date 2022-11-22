const ProbemSet = require('../../models/ProblemSet');

const create = async (req, res) => {
    const { userId } = req;
    const { title, description, deadline, points } = req.body;

    if (!(title && description && deadline && points)) {
        return res.status(400).json({sucess: false, error: 'User must fulfill all the fields'});
    } else {
        if (title.length < 10 || title.length > 50) {
            return res.status(400).json({ sucess: false, error: 'title length too long or too short'});
        }
        if (description.length < 50) {
            return  res.status(400).json({ sucess: false, error: 'description length too short'});
        }
        if (deadline) {
            return res.status(400).json({sucess: false, error: 'User have to provide a date for the deadline field'});
        }
        if (parseInt(points) > 5) {
            return res.status(400).json({sucess: false, error: 'User have to provide a value for the points field'});
        }
    }

    const pset = await ProbemSet.create(title, description, deadline, points);
    res.status(201).json({sucess: true, data: pset});
}

const update = async (req, res) => {
    const { title, description, deadline, points, pset_id} = req.body;
    if (title) {
        if (title.length < 10 || title.length > 50) {
            return res.status(400).json({ sucess: false, error: 'title length too long or too short'});
        }
    }
    if (description) {
        if (description.length < 50) {
            return  res.status(400).json({ sucess: false, error: 'description length too short'});
        }
    }

    const pset = await ProbemSet.update(pset_id, title, description, deadline, points);
};

const deletePset = async (req, res) => {
    const { pset_id } = req.params;
    const deleted = await ProbemSet.delete(pset_id);

    if (!deleted) {
        return res.status(304).json({sucess: false, msg: 'Could not delete the pset'});
    }
    return res.status(200).json({sucess: true, msg: 'pset deleted whit sucess'});
};

const getOne = async (req, res) => {
    const { pset_id } = req.params;
    const pset = await ProbemSet.getOne(pset_id);

    if (!pset) {
        return res.status(404).json({sucess: false, msg: 'Pset not Found'});
    }
    return res.status(200).json({sucess: true, data: pset});
};

const getAll = async (req, res) => {
    const psets = await ProbemSet.getAll();

    if (!pset.length) {
        return res.status(404).json({sucess: false, msg: 'There is no psets available'});
    }
    return res.status(200).json({sucess: true, data: psets});
};

const getAllfromUser = async (req, res) => {
    const { userId } = req;
    const psets = await ProbemSet.getAllfromUser(userId);

    if (!psets.length) {
        return res.status(404).json({sucess: false, msg: 'Pset not Found'});
    }
    return res.status(200).json({sucess: true, data: psets});
};

module.exports = { create, update, deletePset, getAll, getAllfromUser, getOne };