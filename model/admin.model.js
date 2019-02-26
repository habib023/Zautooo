const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Adminschema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

Adminschema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Admin', Adminschema);