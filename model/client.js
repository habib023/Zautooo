const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Clientschema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    phone: { type: Number,required: false,minlength: 8,maxlength: 8},
});

Clientschema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Client', Clientschema);