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

beforeAll(async () => {
    await syncSeed();
    const musicians = await Musician.findAll();
    restQuantity = musicians.length;
});

describe("Testing GET /resturants,", () => {
    it("responds with the array of restaurants", async () => {
        const musicians = await request(app).get("/Musician")
        expect(musicians.body).toEqual({
            name: 'Mick Jagger',
            instrument: 'Voice'
          },
          {
            name: 'Drake',
            instrument: 'Voice',
          },
          {
            name: 'Jimi Hendrix',
            instrument: 'Guitar'
          })
    })
    it("responds with a status code of 200", async () => {
        const status = await request(app).get("/Musician")
        expect(status.statusCode).toBe(200)
    })
    it("returns the correct number of musicians", async () => {
        const musicians = await request(app).get("/Musician")
        expect(musicians.body.length).toEqual(restQuantity)
    })
    it("returns the correct musician data", async () => {
        const musician= await request(app).get("/Musician")
        expect(musician.body).toContainEqual(
            expect.objectContaining({
                id: 1,
                name: 'Mick Jagger',
                instrument: 'Voice',
            })
        )
    })
})

it("GET /Musician/:id", async () => {
    const musician = await request(app).get("/Musician/2")
    expect(musician.body).toEqual(
        expect.objectContaining({
            id: 2,
            name: 'Drake',
            instrument: 'Voice',
        })
    )
})

describe("POST /Musician, ", () => {

    it("request returns the updated with the new value", async () => {
        const response = await request(app)
        .post("/Musician")
        .send({name: "Dave Grohl", instrument: "Guitar"})
        expect(response.body.length).toEqual(restQuantity+1)
    })

    it("returns error when name is empty", async () => {
        const status = await request(app)
        .post("/Musician")
        .send({instrument: "Guitar"})
        expect(status.body).toHavePropety("error")
        expect(Array.isArray(status.body.error)).toBe(true)
    })

    it("returns error when instrument is empty", async () => {
        const status = await request(app)
        .post("/Musician")
        .send({name: "Dave Grohl"})
        expect(status.body).toHavePropety("error")
        expect(Array.isArray(status.body.error)).toBe(true)
    })
})

it("PUT /Musician/:id", async () => {
    await request(app)
    .put("/Musician/1")
    .send({name: "Dave Grohl", instrument: "Guitar"})
    const musician = await Musician.findByPk(1)
    expect(musician.name).toEqual("Dave Grohl")
    expect(musician.instrument).toEqual("Guitar")
})

it("DELETE /Musician/:id", async () => {
    await request(app).delete("/Musician/1")
    const musician =await Musician.findAll()
    expect(musician.length).toEqual(restQuantity)
    expect(musician[0].id).not.toEqual(1)
})