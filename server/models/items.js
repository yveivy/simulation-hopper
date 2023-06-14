const { Schema, model } = require('mongoose'); 

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

const Items = model('Items', itemSchema);

module.exports = Items;