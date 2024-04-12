// const knex = require("knex")(require("../knexfile"));

// const getAllHydrations = async (_req, res) => {
//     try {
//       const hydrations = await knex('hydration');
//       res.status(200).json(hydrations);
//     } catch (error) {
//       res.status(400).json({ error: 'Error retrieving hydrations' });
//     }
//   };
  
//   const getHydrationById = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const hydration = await knex('hydration').where({ id }).first();
//       if (!hydration) {
//         return res.status(404).json({ error: `Hydration with ID ${id} not found` });
//       }
//       res.status(200).json(hydration);
//     } catch (error) {
//       res.status(500).json({ error: 'Error retrieving hydration' });
//     }
//   };
  
//   const createHydration = async (req, res) => {
//     const { liters, user_id } = req.body;
//     try {
//       await knex('hydration').insert({ liters, user_id });
//       res.status(201).json({ message: 'Hydration created successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error creating hydration' });
//     }
//   };
  
//   const updateHydrationById = async (req, res) => {
//     const { id } = req.params;
//     const { liters, user_id } = req.body;
//     try {
//       await knex('hydration').where({ id }).update({ liters, user_id });
//       res.json({ message: 'Hydration updated successfully' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error updating hydration' });
//     }
//   };
  
//   const deleteHydrationById = async (req, res) => {
//     const { id } = req.params;
//     try {
//       const rowsDeleted = await knex('hydration').where({ id }).del();
//       if (rowsDeleted === 0) {
//         return res.status(404).json({ error: `Hydration with ID ${id} not found` });
//       }
//       res.sendStatus(204);
//     } catch (error) {
//       res.status(500).json({ error: 'Error deleting hydration' });
//     }
//   };
  
//   module.exports = {
//     getAllHydrations,
//     getHydrationById,
//     createHydration,
//     updateHydrationById,
//     deleteHydrationById,
//   };