const { Inventory, Characters, Items } = require('../models');
const inventoryData = require('./inventoryData');

const seedInventory = async () => {
    try {
        //Retrieve all characters and items from the database

        const characters = await Characters.find({});
        console.log('Characters:', characters);
        const items = await Items.find({});
        console.log('Items:', items);

        //Map the character and item names to their corresponding object IDs
        const characterIdMap = {};
        const itemIdMap = {};

        characters.forEach((character) => {
            characterIdMap[character.searchable_name] = character.searchable_name;
        });

        items.forEach((item) => {
            itemIdMap[item.searchable_item] = item.searchable_item;
        });

        console.log('Character ID Map:', characterIdMap);
        console.log('Item ID Map:', itemIdMap);
        //check for existing inventory entries
       const existingInventory = await Inventory.find({});
       console.log('Existing Inventory Entries:', existingInventory);
        //If entries exist, delete before seeding
       if (existingInventory.length > 0) {
        await Inventory.deleteMany({});
        console.log('Existing inventory entries deleted.');
       }

        //Create inventory entries using the character names 

        const inventorySeeds = inventoryData.map((entry) => ({
            character:characterIdMap[entry.searchable_name],
            item: itemIdMap[entry.searchable_item],
        }));

        console.log('Inventory Seeds:', inventorySeeds);

        //Insert the inventory seeds into the database 
        await Inventory.deleteMany({});
        await Inventory.insertMany(inventorySeeds);

        console.log('Inventory seeding completed successfully.');
    } catch (error) {
        console.error('Error seeding inventory:', error);
    }
};

module.exports = seedInventory; 