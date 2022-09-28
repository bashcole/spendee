import User from "../../../models/User.js";
import chai from "chai/index.mjs";
import {expect} from "chai"
import chaiHttp from "chai-http";
import server from "../../../utils/server.js"
import {CreateTestUser} from "../../../utils/test_service.js";
import RefreshToken from "../../../models/RefreshToken.js";
import {generateRefreshToken} from "../../../utils/generateTokens.js";

after(async () => {
    await server.close()
});

chai.use(chaiHttp);

describe('Given a register request without password', () => {

    describe('When validating the request', () => {

        it('Then we should receive missing password', async () => {

            let data = {
                username: "The Lord of the Rings"
            }

            const res = await chai.request(server)
                .post('/api/users/register')
                .send(data)

            expect(res.status).to.equal(400)
            expect(res.body.error).to.be.an('object')
            expect(res.body.error.errors).to.be.an('array')

        })
    })
})

describe('Given a register request with user who is already exist', () => {

    describe('When validating the request', () => {

        it('Then we should receive error_code `user_already_exist`', async () => {

            const registerData = {
                name: "testing asdsad",
                username: "testing",
                email: "example@abv.bg",
                password: "12345678",
                picture: "https://example.com",
                confirm_password: "12345678"
            }

            await CreateTestUser(registerData)

            const res = await chai.request(server)
                .post('/api/users/register')
                .send(registerData)

            expect(res.status).to.equal(400)
            expect(res.body.error).to.be.an('object')
            expect(res.body.error.errors).to.be.an('array')

            const error = res.body.error.errors.some(item => item.error_code === "user_already_exist")

            expect(error).to.equal(true);

        })
    })
})

describe('Given a refresh token that doest exist', () => {

    describe('When validating the request', () => {

        it('Then we should receive error_code `refresh_token_invalid`', async () => {

            const res = await chai.request(server)
                .post('/api/token/refresh')
                .set('refresh_token', 'INVALID_TOKEN')

            expect(res.status).to.equal(400)
            expect(res.body.error).to.be.an('object')
            expect(res.body.error.errors).to.be.an('array')

            const error = res.body.error.errors.some(item => item.error_code === "refresh_token_invalid")

            expect(error).to.equal(true);

        })
    })
})

describe('Given a refresh token', () => {

    describe('When executing the request', () => {

        it('Then we should receive a access token', async () => {
            const user = await CreateTestUser()
            const refreshToken = generateRefreshToken()
            const r = await RefreshToken.create({
                _id: refreshToken,
                userID: user._id,
                expireAt: new Date(Date.now() + 60*60*24*1000),
                createdByIp: ""
            })

            const res = await chai.request(server)
                .post('/api/token/refresh')
                .set('refresh_token', refreshToken)

            expect(res.status).to.equal(200)
            expect(res.body.token).to.be.a('string');

        })
    })
})