const { Schema, model } = require('mongoose');

const characterSchema = new Schema({  
    searchable_name: {
        type: String,
        required: true,
    },
    full_name: {
        type: String, 
        required: true, 
    },
    role: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
}, {
    timestamps: false,
    collection: 'characters',
});

const Characters = model('Characters', characterSchema);

module.exports = Characters;