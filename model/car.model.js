const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    model: String,
    description: String,
    nbrh: Number,
    eta: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Cars', CarSchema);