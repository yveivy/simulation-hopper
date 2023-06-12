const { Inventory, Characters, Items } = require('../models');
const inventoryData = require('./inventoryData.json');

const seedInventory = async () => {
    try {
        //Retrieve all characters and items from the database

        const characters = await Characters.find({});
        const items = await Items.find({});

        //Map the character and item names to their corresponding object IDs
        const characterIdMap = {};
        const itemIdMap = {};

        characters.forEach((character) => {
            characterIdMap[character.searchable_name] = character._id;
        });

        items.forEach((item) => {
            itemIdMap[item.searchable_item] = item._id;
        });

        //Create inventory entries using the object IDs

        const inventorySeeds = inventoryData.map((entry) => ({
            character:characterIdMap[entry.full_name],
            item: itemIdMap[entry.item_name],
        }));

        //Insert the inventory seeds into the database 
        await Inventory.insertMany(inventorySeeds);

        console.log('Inventory seeding completed successfully.');
    } catch (error) {
        console.error('Error seeding inventory:', error);
    }
};

module.exports = seedInventory; 