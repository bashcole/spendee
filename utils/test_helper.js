import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer;
const opts = {}; // remove this option if you use mongoose 5 and above

beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, opts);
});

afterEach(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});