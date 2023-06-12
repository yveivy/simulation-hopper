const { Schema, model } = require('mongoose');

const inventorySchema = new mongoose.Schema({
    full_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character',
    },

    item_name: {
        type: mongoose.Schema.Types.Object.Id,
        ref: 'Item',

    },

}, {

    timestamps: false,
    collection: 'inventory',
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;