const knex = require("knex")(require("../knexfile"));

const getAllMeals = async (_req, res) => {
    try {
        const meals = await knex("meal");
        res.status(200).json(meals);
    } catch (err) {
        res.status(400).send(`Error retrieving meals: ${err}`);
    }
};

const findOne = async (req, res) => {
    try {
        const mealFound = await knex("meal")
            .where({ id: req.params.id });

        if (mealFound.length === 0) {
            return res.status(404).json({
                message: `Meal with ID ${req.params.id} not found`
            });
        }

        const mealData = mealFound[0];
        res.status(200).json(mealData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve meal data for meal with ID ${req.params.id}`,
        });
    }
};

const createMeal = async (req, res) => {

    if (
        !req.body.calories ||
        !req.body.protein ||
        !req.body.fats ||
        !req.body.carbs
    ) {
        return res.status(400).json({
            message: "Missing properties in the request body",
        });
    }

    const defaultUserId = 1;

    try {
        const result = await knex("meal").insert({
            calories: req.body.calories,
            protein: req.body.protein,
            fats: req.body.fats,
            carbs: req.body.carbs,
            user_id: defaultUserId, // Assign default user ID
        });

        const newMealId = result[0];
        const createdMeal = await knex("meal").where({ id: newMealId });

        res.status(201).json(createdMeal);
    } catch (error) {
        res.status(500).json({ message: `Unable to create meal: ${error}` });
    }
};

const updateMealById = async (req, res) => {
    const { id } = req.params;
    const { calories, protein, fats, carbs, user_id } = req.body;
    try {
        await knex("meal").where({ id }).update({ calories, protein, fats, carbs, user_id });
        res.json({ message: 'Meal updated successfully' });
    } catch (err) {
        res.status(500).json({ message: `Unable to update meal: ${err}` });
    }
};

const deleteMealById = async (req, res) => {
    const { id } = req.params;
    try {
        const rowsDeleted = await knex("meal").where({ id }).del();
        if (rowsDeleted === 0) {
            return res.status(404).json({ message: `Meal with ID ${id} not found` });
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ message: `Unable to delete meal: ${err}` });
    }
};

module.exports = {
    getAllMeals,
    findOne,
    createMeal,
    updateMealById,
    deleteMealById,
};