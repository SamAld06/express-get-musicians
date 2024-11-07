const {Router} = require("express")
const router = Router()
const Musician = require("../models/Musician")
const {Router} = require("express")
const {check, validationResult} = require("express-validator")

router.get("/", async function (req, res) {
    const musicians = await Musician.findAll()
    res.json(musicians)
})
router.get("/:id", async function (req, res) {
    const musician = await Musician.findByPk(req.params.id)
    res.json(musician)
})
router.post("/", [
    check ("name").notEmpty().trim().isLength({min: 10, max: 30}),
    check("instrument").notEmpty().trim(),
], async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.json({error: errors.array})
    await Musician.create(req.body);
    const musicians = await Musician.findAll()
    res.json(musicians)
})
router.put("/", async function(req, res) {
    const newMusician = await Musician.update(req.body,
        {where: {id: req.params.id}}
    )
    res.json(newMusician)
})
router.delete("/:id", async function (req, res) {
    const musician = await Musician.destroy(
        {where: {id: req.params.id}}
    )
    res.json(musician)
})


module.exports = router