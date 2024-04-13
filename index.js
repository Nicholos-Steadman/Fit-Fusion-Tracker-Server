const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5050;

app.use(cors());

app.use(express.json());

// querying all meals
const mealRoutes = require('./routes/meal-routes');
app.use('/meals', mealRoutes)

// querying all workouts
const workoutRoutes = require('./routes/workout-routes');
app.use('/workouts', workoutRoutes)

// querying all hydration
const hydrationRoutes = require('./routes/hydration-routes');
app.use('/hydrations', hydrationRoutes)

app.use((req, res, next) => {
    console.log("Logging a request from middleware");
    next();
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});