const knex = require("knex")(require("../knexfile"));

const getAllHydrations = async (_req, res) => {
    try {
      const hydrations = await knex('hydration');
      res.status(200).json(hydrations);
    } catch (error) {
      res.status(400).json({ error: 'Error retrieving hydrations' });
    }
  };
  
  const getHydrationById = async (req, res) => {
    try {
        const hydrationFound = await knex("hydration")
            .where({ id: req.params.id });

        if (hydrationFound.length === 0) {
            return res.status(404).json({
                message: `Hydration with ID ${req.params.id} not found`
            });
        }

        const hydrationData = hydrationFound[0];
        res.status(200).json(hydrationData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve hydration data for hydration with ID ${req.params.id}`,
        });
    }
};
  
  const createHydration = async (req, res) => {
    if (
        !req.body.liters
    ) {
        return res.status(400).json({
            message: "Missing properties in the request body",
        });
    }

    const defaultUserId = 1;

    try {
        const result = await knex("hydration").insert({
            liters: req.body.liters,
            user_id: defaultUserId, // Assign default user ID
        });

        const newHydrationId = result[0];
        const createdHydration = await knex("hydration").where({ id: newHydrationId });

        res.status(201).json(createdHydration);
    } catch (error) {
        res.status(500).json({ message: `Unable to create hydration: ${error}` });
    }
};
  
  const updateHydrationById = async (req, res) => {
    const { id } = req.params;
    const { liters, user_id } = req.body;
    try {
      await knex('hydration').where({ id }).update({ liters, user_id });
      res.json({ message: 'Hydration updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating hydration' });
    }
  };
  
  const deleteHydrationById = async (req, res) => {
    const { id } = req.params;
    try {
      const rowsDeleted = await knex('hydration').where({ id }).del();
      if (rowsDeleted === 0) {
        return res.status(404).json({ error: `Hydration with ID ${id} not found` });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting hydration' });
    }
  };
  
  module.exports = {
    getAllHydrations,
    getHydrationById,
    createHydration,
    updateHydrationById,
    deleteHydrationById,
  };