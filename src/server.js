const http = require('http');
const app = require('./app');
require('dotenv').config();




const { connectDb } = require('./services/mongo');


const PORT = process.env.PORT || 4000;

const server = http.createServer(app);



async function startServer () {

    await connectDb();
    server.listen(PORT, () => {
        console.log(`now running on port ${ PORT }`);
    });
}



startServer();