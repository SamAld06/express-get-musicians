const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")
const router = require("../routes/routes.js")
app.use(express.json())
app.use(express.urlencoded())

//TODO: Create a GET /musicians route to return all musicians 

app.get("/musicians", async (req, res) => {
    const allMusicians = await Musician.findAll({})
    res.json(allMusicians)
})

app.get("/musicians/id:", async (req, res) => {
    const musician = await Musician[req.params.id - 1]
    res.json(musician)
})

app.post("/musicians", async (req, res) => {
    const musician = await Musician.create(req.body)
    res.json(musician)
})

app.put("/musicians", (res, req) => {
    let index = req.params.id
    Musician[index] = req.body
    res.json(index)
})

app.delete("/musicians/:id", (res, rep) => {
    const index = req.params.id
    Musician.splice(index, 1)
    res.json(index)
})





module.exports = app;