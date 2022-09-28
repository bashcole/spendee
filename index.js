import server from "./utils/server.js"
import connectDB from './config/database.js'

connectDB().then()

server.on('connect', function() {
  console.log(' connect ...');
});
