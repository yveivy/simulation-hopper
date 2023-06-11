const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    character_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
    },

    item_id: {
        type: mongoose.Schema.Types.Object.Id,
        ref: 'Item',

    },

}, {

    timestamps: false,
    collection: 'inventory',
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;