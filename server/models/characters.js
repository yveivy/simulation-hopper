const { Schema, model } = require('mongoose');

<<<<<<< HEAD
const characterSchema = new Schema({  
=======
const characterSchema = new Schema({
  
>>>>>>> main
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