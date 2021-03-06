/* Dependencies */
const mongoose = require('./connection')
const {Schema, model} = mongoose

/* Define Movement Schema */
const movementSchema = new Schema({
    // lift_id: {type: Schema.Types.ObjectId, ref: 'Lift', required: true},
    date: {type: Date, required: true},
    type: {type: String, required: true},
    sets: [{
        reps: { type: Number, required: true}, 
        weight: { type: Number, required: true}
    }],
    username: {type: String}
})

/* Create Movement Model */
const Movement = model('Movement', movementSchema)

/* Export */
module.exports = Movement