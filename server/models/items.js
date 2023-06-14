const { Schema, model } = require('mongoose'); 
<<<<<<< HEAD
=======

>>>>>>> main
const itemSchema = new Schema({
    searchable_item: {
        type: String,
        required: false,
    },
    item_name: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
}, {
    timestamps: false,
    collection: 'items',
});
<<<<<<< HEAD
const Items = model('Items', itemSchema);
=======

const Items = model('Items', itemSchema);

>>>>>>> main
module.exports = Items;