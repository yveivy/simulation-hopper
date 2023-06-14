const { Schema, model } = require('mongoose');

const inventorySchema = new Schema({
    searchable_name: {
        type: Schema.Types.ObjectId,
        ref: 'Character',
    },

    searchable_item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',

    },

}, {

    timestamps: false,
    collection: 'inventory',
});

const Inventory = model('Inventory', inventorySchema);

module.exports = Inventory;