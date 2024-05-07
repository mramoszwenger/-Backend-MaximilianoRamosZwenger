const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        required: true
    }
});

const userModel = model('users', usersSchema);

module.exports = {
    userModel
}