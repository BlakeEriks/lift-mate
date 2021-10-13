/* Dependencies */
const express = require('express')
const Movement = require('../models/movement')
const bcrypt = require('bcryptjs')

/* Create Movement Router */
const movementRouter = express.Router()

/* Define Routes */
movementRouter.get('/new', (req,res) => {
    res.render('movements/new', {liftId: req.query.liftId})
})

movementRouter.delete('/:id', (req,res) => {
    Movement.findByIdAndDelete(req.params.id, (err, movement) => {
        res.redirect(`/movements?liftId=${req.query.liftId}`)
    })
})

movementRouter.get('/', (req,res) => {
    Movement.find({lift_id: req.query.liftId}, (err, movements) => {
        res.render('movements/index', {movements, liftId: req.query.liftId})
    })
})

movementRouter.post('/', (req,res) => {
    let movement = getMovementFromBody(req.body)
    movement.lift_id = req.query.liftId
    Movement.create(movement, (err, movement) => {
        res.redirect(`/movements?liftId=${req.query.liftId}`)
    })
})

movementRouter.put('/:id', (req,res) => {
    let movement = getMovementFromBody(req.body)
    Movement.findByIdAndUpdate(req.params.id, movement, (err,movement) => {
        res.redirect(303, `/movements/${req.params.id}`)
        // res.redirect(303, `/movements?${movement.lift_id}`)
    })
})

movementRouter.get('/:id/edit', (req,res) => {
    Movement.findById(req.params.id, (err,movement) => {
        res.render('movements/edit', {movement})
    })
})

movementRouter.get('/:id', (req,res) => {
    Movement.findById(req.params.id, (err,movement) => {
        res.render('movements/show', {movement})
    })
})

/* Utils */
const getMovementFromBody = body => {
    let movement = {sets: []}
    movement.type = body.type
    body.weight.forEach( (weight, index) => movement.sets.push({weight: weight, reps: body.reps[index]}))
    return movement
}

/* Export */
module.exports = movementRouter