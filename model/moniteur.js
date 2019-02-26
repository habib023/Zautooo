const mongoose = require('mongoose');

const MoniteurSchema = mongoose.Schema({
    name: String,
    prenom: String,
    nbrh: Number,
    //email:
    login: String,
    password: String,
    disp: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Moniteur', MoniteurSchema);