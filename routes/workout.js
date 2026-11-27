let express = require('express');
let router = express.Router();
let Workout = require('../models/workout');

router.get('/', async function(req, res, next) {
    try {
        let Workoutlist = await Workout.find();

        res.render('workouts/list', {
            title: 'Workouts',
            Workoutlist: Workoutlist
        });
    }
    catch (err) {
        next(err);
    }
});
router.get('/add', function(req, res) {
    res.render('workouts/add', {
        title: 'Add Workout'
    });
});
router.post('/add', async function(req, res, next) {
    try {
        let newWorkout = new Workout({
            exerciseName: req.body.exerciseName,
            date: req.body.date,
            sets: req.body.sets,
            reps: req.body.reps,
            weight: req.body.weight
        });

        await newWorkout.save();
        res.redirect('/workouts');
    }
    catch (err) {
        next(err);
    }
});
router.get('/edit/:id', async function(req, res, next) {
    try {
        let Workoutlist = await Workout.find({
            _id: req.params.id
    });
let workout = Workoutlist[0];

        if (!workout) {
            return res.status(404).send('Workout not found');
        }

        res.render('workouts/edit', {
            title: 'Edit Workout',
            workout: workout
        });
    }
    catch (err) {
        next(err);
    }
});
router.post('/edit/:id', async function(req, res, next) {
    try {
        let workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).send('Workout not found');
        }

        workout.exerciseName = req.body.exerciseName;
        workout.date = req.body.date;
        workout.sets = req.body.sets;
        workout.reps = req.body.reps;
        workout.weight = req.body.weight;

        await workout.save();
        res.redirect('/workouts');
    }
    catch (err) {
        next(err);
    }
});
router.post('/delete/:id', async function(req, res, next) {
    try {
        let result = await Workout.deleteOne({
            _id: req.params.id
        });
        if (result.deletedCount === 0) {
            return res.status(404).send('Workout not found');
        }
        res.redirect('/workouts');
    }
    catch (err) {
        next(err);
    }
});
router.post('/delete/:id', async function(req, res, next) {
    try {
        let result = await Workout.deleteOne({
            _id: req.params.id
        });

        if (result.deletedCount === 0) {
            return res.status(404).send('Workout not found');
        }

        res.redirect('/workouts');
    }
    catch (err) {
        next(err);
    }
});
module.exports = router;