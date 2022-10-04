const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name:  { type: String, required: true },
    firstName : { type: String, required: true },
    lastName: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);