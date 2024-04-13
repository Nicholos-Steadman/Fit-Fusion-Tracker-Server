const knex = require("knex")(require("../knexfile"));

const getAllWorkouts = async (_req, res) => {
    try {
      const workouts = await knex('workout');
      res.status(200).json(workouts);
    } catch (error) {
      res.status(400).json({ error: 'Error retrieving workouts' });
    }
  };
  
  const getWorkoutById = async (req, res) => {
    try {
        const workoutFound = await knex("workout")
            .where({ id: req.params.id });

        if (workoutFound.length === 0) {
            return res.status(404).json({
                message: `Workout with ID ${req.params.id} not found`
            });
        }

        const workoutData = workoutFound[0];
        res.status(200).json(workoutData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve workout data for workout with ID ${req.params.id}`,
        });
    }
};
  
  const createWorkout = async (req, res) => {
    if (
        !req.body.workout_name ||
        !req.body.sets ||
        !req.body.reps 
    ) {
        return res.status(400).json({
            message: "Missing properties in the request body",
        });
    }

    const defaultUserId = 1;

    try {
        const result = await knex("workout").insert({
            name: req.body.workout_name,
            sets: req.body.sets,
            reps: req.body.reps,
            user_id: defaultUserId, // Assign default user ID
        });

        const newWorkoutId = result[0];
        const createdWorkout = await knex("workout").where({ id: newWorkoutId });

        res.status(201).json(createdWorkout);
    } catch (error) {
        res.status(500).json({ message: `Unable to create workout: ${error}` });
    }
};
  
  const updateWorkoutById = async (req, res) => {
    const { id } = req.params;
    const { workout_name, sets, reps, user_id } = req.body;
    try {
      await knex('workout').where({ id }).update({ workout_name, sets, reps, user_id });
      res.json({ message: 'Workout updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating workout' });
    }
  };
  
  const deleteWorkoutById = async (req, res) => {
    const { id } = req.params;
    try {
      const rowsDeleted = await knex('workout').where({ id }).del();
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: `Workout with ID ${id} not found` });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting workout' });
    }
  };
  
  module.exports = {
    getAllWorkouts,
    getWorkoutById,
    createWorkout,
    updateWorkoutById,
    deleteWorkoutById,
  };