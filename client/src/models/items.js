const mongoose = require('mongoose'); 
const itemSchema = new mongoose.Schema({
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

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;