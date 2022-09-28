import User from "../../../models/User.js";
import chai from "chai/index.mjs";
import {expect} from "chai"
import chaiHttp from "chai-http";
import server from "../../../utils/server.js"

after(async () => {
    await server.close()
});

chai.use(chaiHttp);


describe('Given a empty users collection', () => {

    describe('When counting the number of users', () => {

        it('Then the result should be 0', async () => {
            const cnt = await User.count();
            expect(cnt).to.equal(0);
        })
    })

    describe('When creating a new user', () => {

        it('Then the result should be 0', async () => {
            await User.create({
                name: "Mocha",
                username: "chai",
                email: "mocha@chai.com",
                picture: "https://example.com",
                password: "123456"
            })

            const cnt = await User.count();
            expect(cnt).to.equal(1);
        })
    })
})