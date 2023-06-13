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
        required: false,
    },
    
}, {
    timestamps: false,
    collection: 'characters',
});

const Character = model('Character', characterSchema);

module.exports = Character;