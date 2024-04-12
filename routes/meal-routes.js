const router = require("express").Router();
const mealController = require("../controllers/mealController.js");


// GET /meals - Get all meals
router.get('/', mealController.getAllMeals);

// GET /meals/:id - Get meal by ID
router.get('/:id', mealController.findOne);

// POST /meals - Create a new meal
router.post('/', mealController.createMeal);

// PUT /meals/:id - Update meal by ID
router.put('/:id', mealController.updateMealById);

// DELETE /meals/:id - Delete meal by ID
router.delete('/:id', mealController.deleteMealById);

module.exports = router;

