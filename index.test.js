// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");
const syncSeed = require("./seed.js")


describe('./musicians endpoint', () => {
    // Write your tests here
    test("can respond with the full array of musician objects", async () =>{
        const response = await request(app).get("/musicians")
        expect(response.statusCode).toBe(200)
        const responseData = JSON.parse(response.test)
        expect(responseData).toEqual(expect.arrayContaining(responseData.map(musician => expect.objectContaining({
            name: expect.any(String),
            instrument: expect.any(String)
        }))))
    })
    
    test("can respond with the correct musician", async () =>{
        const response = await request(app).get("/musicians/1")
        const responseData = JSON.parse(response.text)
        expect(response.statusCode).toBe(200)
        expect(responseData.id).toBe(1)
    })

    test("can add to the list of musicians", async () => {
        const response = await request(app).post("/musicans")
        const responseData = JSON.parse(response.text)
        expect(response.statusCode).toBe(200)
    })

    test("can delete a musician from the full list", async () => {
        const response = await request(app).delete("/musicians/1")
        expect(response.statusType).toBe(200)
        const responseData = JSON.parse(response.text)
    })

    test("can update a musician in the list of musicians", async () => {
        const response = await request(app).put("/musicians/1")
        expect(response.statusType).toBe(200)
        const responseData = JSON.parse(response.text)
    })
    
})
