const mongoose = require('mongoose');
require('dotenv').config();


const uri = process.env.MONGO_URI;

mongoose.connection.once('open', () => {
    console.log('connected successfully');
});

mongoose.connection.on('err', () => {
    console.log('connection failed');
});


async function connectDb () {
    await mongoose.connect(uri);
}

async function disconnectDb () {
    await mongoose.disconnect();
}



module.exports = {
    connectDb,
    disconnectDb
};