const { prisma } = require("../config/prisma");

const getAvailableFoods = async (req, res) => {
	try {
		const queryOptions = {};
		if (req.query.email) {
			queryOptions.where = {
				email: req.query.email,
			};
		}

		const foods = await prisma.food.findMany(queryOptions);
		res.json(foods);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const getFeaturedFoods = async (req, res) => {
	try {
		const foods = await prisma.food.findMany({
			orderBy: {
				quantity: "desc",
			},
			take: 6,
		});
		res.json(foods);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const createFood = async (req, res) => {
	try {
		const food = await prisma.food.create({
			data: req.body,
		});
		res.json(food);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const getFoodByUser = async (req, res) => {
	try {
		const foods = await prisma.food.findMany({
			where: {
				email: req.query.email,
			},
		});
		res.json(foods);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const updateFood = async (req, res) => {
	try {
		const food = await prisma.food.update({
			where: { id: req.params.id },
			data: req.body,
		});
		res.json(food);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const getSingleFood = async (req, res) => {
	try {
		const food = await prisma.food.findUnique({
			where: { id: req.params.id },
		});
		res.json(food);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const deleteFood = async (req, res) => {
	try {
		const food = await prisma.food.delete({
			where: { id: req.params.id },
		});
		res.json(food);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const getFoodRequests = async (req, res) => {
	try {
		const foods = await prisma.foodRequest.findMany({
			where: {
				quantity: {
					lt: 10,
				},
			},
		});
		res.json(foods);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

const createFoodRequest = async (req, res) => {
	try {
		const food = await prisma.foodRequest.create({
			data: req.body,
		});
		res.json(food);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
};

module.exports = {
	getAvailableFoods,
	getFeaturedFoods,
	createFood,
	getFoodByUser,
	updateFood,
	getSingleFood,
	deleteFood,
	getFoodRequests,
	createFoodRequest,
};
