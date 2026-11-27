let mongoose = require('mongoose');

let workoutModel = mongoose.Schema({
    exerciseName: String,
    date: String,
    sets: Number,
    reps: Number,
    weight: Number
},
{
    collection: 'workouts'
});

module.exports = mongoose.model('Workout', workoutModel);