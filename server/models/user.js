const { Schema, model } = require('mongoose');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Schema to create User model
const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please enter a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },

    password: {
        type: String,
        required: true,
    },

    gameData: {
        currentProgress: {
           //game position, item inventory as achieved at save
            
        },
    },


});

const User = mongoose.model('User', userSchema);

module.exports = User;