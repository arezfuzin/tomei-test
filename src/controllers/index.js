const log = require('../utils/logger');
const { findUsersProcessor, postUserProcessor, putUserProcessor, deleteUserProcessor } = require('../services');

async function findUsers(req, res) {
    try {
        const { id, name, email } = req.query;
        const result = await findUsersProcessor(id, name, email);

        log.info({ result });
        
        return res.status(200).json(result);
    } catch (error) {
        log.error(error);

        return res.status(500).json({
            message: 'Server error !',
            error: error.message
        });
    }
}

async function postUser(req, res) {
    try {
        const { name, email, password, avatar } = req.body;
        const result = await postUserProcessor(name, email, password, avatar);

        log.info({ result });
        
        return res.status(200).json(result);
    } catch (error) {
        log.error(error);

        return res.status(500).json({
            message: 'Server error !',
            error: error.message
        });
    }
}

async function putUser(req, res) {
    try {
        const { id } = req.params;
        const updatedFields = { ...req.body };
        const result = await putUserProcessor(id, updatedFields);

        log.info({ result });
        
        return res.status(200).json(result);
    } catch (error) {
        log.error(error);

        return res.status(500).json({
            message: 'Server error !',
            error: error.message
        });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const result = await deleteUserProcessor(id);

        log.info({ result });
        
        return res.status(200).json(result);
    } catch (error) {
        log.error(error);

        return res.status(500).json({
            message: 'Server error !',
            error: error.message
        });
    }
}

module.exports = {
    findUsers,
    postUser,
    putUser,
    deleteUser
};