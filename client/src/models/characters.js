const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    character_id: {
        type: Number,
        required: true,
        unique: true,
    },

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
        required: false,
    },
    
}, {
    timestamps: false,
    collection: 'characters',
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;