const bcryptjs = require('bcryptjs');
const uuid = require('uuid').v4;
const db = require('../database');
const log = require('../utils/logger');

const defaultAvatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

function validateEmail(email) {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}

function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/;
    return re.test(password);
}

async function findUsersProcessor(id = '', name = '', email = '') {
    log.info('find users process');
    log.info(`id: ${id}`);
    log.info(`name: ${name}`);
    log.info(`email: ${email}`);

    const where = {};

    if (id) where.id = id;
    if (name) where.name = name;
    if (email) where.email = email;

    const users = await db.model.user.findAll({ where });

    return { users };
}

async function postUserProcessor(name, email, password, avatar = defaultAvatar) {
    log.info('post user process');

    if (!validateEmail(email)) {
        return { message: 'Email format is wrong.' };
    }

    if (!validatePassword(password)) {
        return { message: 'Password should 8 character length, using at least 1 uper case and symbol' };
    }

    const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

    const newUser = await db.model.user.create({
        id: uuid(),
        name,
        email,
        password: hashPassword,
        avatar
    });

    return { message: 'New user sign up', newUser };
}

async function putUserProcessor(id, updatedFields) {
    log.info('put user process');
    log.info(`id: ${id}`);
    log.info(`id: ${JSON.stringify(updatedFields)}`);

    if (updatedFields.email && !validateEmail(updatedFields.email)) {
        return { message: 'Email format is wrong.' };
    }

    if (updatedFields.password) {
        if (!validatePassword(updatedFields.password)) {
            return { message: 'Password should 8 character length, using at least 1 uper case and symbol' };
        } else {
            updatedFields.password = bcryptjs.hashSync(updatedFields.password, bcryptjs.genSaltSync(10));
        }
    }

    await db.model.user.update(updatedFields, {
        where: {
            id
        }
    });

    const updatedUser = await db.model.user.findByPk(id);

    return { message: 'User updated', updatedUser };
}

async function deleteUserProcessor(id) {
    log.info('delete user process');
    log.info(`id: ${id}`);

    const deletedUser = await db.model.user.findByPk(id);

    await db.model.user.destroy({
        where: {
            id
        }
    });

    return { message: 'User deleted', deletedUser };
}

module.exports = {
    findUsersProcessor,
    postUserProcessor,
    putUserProcessor,
    deleteUserProcessor
};