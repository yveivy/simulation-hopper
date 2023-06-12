const { connect, connection } = require('mongoose');
require('dotenv/config')

let connectionString;

if (process.env.NODE_ENV === 'production') {
    connectionString = process.env.SERVER_MONGODB_URI;
} else {
    connectionString = process.env.LOCAL_MONGODB_URI;
}

connect(connectionString);

module.exports = connection;
