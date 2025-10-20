const mongoose = require('mongoose');
const path = require('path');

let mongoServer;
let usingExternal = false;

/**
 * Connect to MongoDB for tests.
 * If an environment variable MONGODB_URI_TEST or MONGODB_URI is provided,
 * the tests will use that (recommended when you want a real DB).
 */
module.exports.connect = async () => {
    const externalUri = process.env.MONGODB_URI_TEST || process.env.MONGODB_URI;
    usingExternal = true;
    // Connect to the provided MongoDB URI (ensure it's a test DB!)
    await mongoose.connect(externalUri, {
        // mongoose no longer needs these options in newer versions but harmless
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    return;
};

module.exports.closeDatabase = async () => {
    try {
        if (!usingExternal) {
            await mongoose.connection.dropDatabase();
        }
    } catch (err) {
        // ignore drop errors
    }

    await mongoose.connection.close();

    if (mongoServer) {
        await mongoServer.stop();
    }
};

module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        try {
            await collection.deleteMany();
        } catch (err) {
            // ignore errors on clear
        }
    }
};
