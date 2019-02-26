const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Admin = db.Admin;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const admin = await Admin.findOne({ username });
    if (admin && bcrypt.compareSync(password, admin.hash)) {
        const { hash, ...adminWithoutHash } = admin.toObject();
        const token = jwt.sign({ sub: admin.id }, config.secret);
        return {
            ...adminWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await Admin.find().select('-hash');
}

async function getById(id) {
    return await Admin.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await Admin.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const admin = new Admin(userParam);

    // hash password
    if (userParam.password) {
        admin.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await admin.save();
}

async function update(id, userParam) {
    const admin = await Admin.findById(id);

    // validate
    if (!admin) throw 'User not found';
    if (admin.username !== userParam.username && await Admin.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(admin, userParam);

    await admin.save();
}

async function _delete(id) {
    await Admin.findByIdAndRemove(id);
}