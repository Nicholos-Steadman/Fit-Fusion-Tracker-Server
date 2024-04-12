// const knex = require("knex")(require("../knexfile"));

// const getAllWorkouts = async (_req, res) => {
//     try {
//       const workouts = await knex('workout');
//       res.status(200).json(workouts);
//     } catch (error) {
//       res.status(400).json({ error: 'Error retrieving workouts' });
//     }
//   };
  
//   const getWorkoutById = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const workout = await knex('workout').where({ id }).first();
//       if (!workout) {
//         return res.status(404).json({ error: `Workout with ID ${id} not found` });
//       }
//       res.status(200).json(workout);
//     } catch (error) {
//       res.status(500).json({ error: 'Error retrieving workout' });
//     }
//   };
  
//   const createWorkout = async (req, res) => {
//     const { workout_name, sets, reps, user_id } = req.body;
//     try {
//       await knex('workout').insert({ workout_name, sets, reps, user_id });
//       res.status(201).json({ message: 'Workout created successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error creating workout' });
//     }
//   };
  
//   const updateWorkoutById = async (req, res) => {
//     const { id } = req.params;
//     const { workout_name, sets, reps, user_id } = req.body;
//     try {
//       await knex('workout').where({ id }).update({ workout_name, sets, reps, user_id });
//       res.json({ message: 'Workout updated successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error updating workout' });
//     }
//   };
  
//   const deleteWorkoutById = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const rowsDeleted = await knex('workout').where({ id }).del();
//       if (rowsDeleted === 0) {
//         return res.status(404).json({ error: `Workout with ID ${id} not found` });
//       }
//       res.sendStatus(204);
//     } catch (error) {
//       res.status(500).json({ error: 'Error deleting workout' });
//     }
//   };
  
//   module.exports = {
//     getAllWorkouts,
//     getWorkoutById,
//     createWorkout,
//     updateWorkoutById,
//     deleteWorkoutById,
//   };