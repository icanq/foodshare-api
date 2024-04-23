const express = require("express");
const router = express.Router();
const {
	getAvailableFoods,
	getFeaturedFoods,
	createFood,
	updateFood,
	getSingleFood,
	deleteFood,
	getFoodRequests,
	createFoodRequest,
} = require("../controllers/foodController");

router.get("/featured", getFeaturedFoods);
router.get("/requests", getFoodRequests);
router.post("/requests", createFoodRequest);

router.get("/", getAvailableFoods);
router.post("/", createFood);
router.get("/:id", getSingleFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

module.exports = router;
