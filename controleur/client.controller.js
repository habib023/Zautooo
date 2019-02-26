const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Client = db.Client;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const client = await Client.findOne({ username });
    if (  client && bcrypt.compareSync(password, client.hash)) {
        const { hash, ...clientWithoutHash } = client.toObject();
        const token = jwt.sign({ sub: client.id }, config.secret);
        return {
            ...clientWithoutHash,
            token
        };
    }
}

async function getAll() {
    return await Client.find().select('-hash');
}

async function getById(id) {
    return await Client.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await Client.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const client = new Client(userParam);

    // hash password
    if (userParam.password) {
      client.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await client.save();
}

async function update(id, userParam) {
    const client = await Client.findById(id);

    // validate
    if (!client) throw 'User not found';
    if (client.username !== userParam.username && await Client.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(client, userParam);

    await client.save();
}

async function _delete(id) {
    await Client.findByIdAndRemove(id);
}