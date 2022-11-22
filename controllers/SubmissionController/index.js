const Submission = require('../../models/Submission');
const { unlinkSync } = require('fs');

const create = async (req, res) => {
    const { userId, dir_path } = req;
    const {pset_id} = req.body;

    const submission = await Submission.create(userId, pset_id, dir_path);
    res.status(201).json({sucess: true, data: submission});
};

const update = async (req, res) => {
    const { userId, dir_path } = req;
    const {submission_id} = req.params;

    let submission = await Submission.getOne(submission_id);
    unlinkSync(submission.dir_path);

    submission = await Submission.update(submission_id, dir_path);
    res.status(201).json({sucess: true, data: submission});
};

const deleteSubm = async (req, res) => {
    const {submission_id} = req.params;

    const submission = await Submission.getOne(submission_id);
    const deleted = await Submission.delete(submission_id);

    if (!deleted) {
        return res.status(304).json({ sucess: false, error: 'Could not delete the item'});
    }
    unlinkSync(submission.dir_path);
    
    return res.status(200).json({sucess: true, msg: 'item deleted whit sucess'});
};

const getOne = async (req, res) => {
    const { submission_id } = req.params;
    const submission = await Submission.getOne(submission_id);

    if (!submission) {
        return res.status(404).json({sucess: false, msg: 'submission item not Found'});
    }
    return res.status(200).json({sucess: true, data: submission});
};

const getAll = async (req, res) => {
    const { userId } = req.params;
    const submissions = await Submission.getAll(userId);

    if (!submissions.length) {
        return res.status(404).json({sucess: false, msg: 'There is no submissions sent by the student'});
    }
    return res.status(200).json({sucess: true, data: submissions});
};

module.exports = { create, update, deleteSubm, getAll, getOne };