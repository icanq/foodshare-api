const { prisma } = require("../config/prisma");
const jwt = require("jsonwebtoken");

const createJwtToken = async (req, res) => {
	try {
		const user = req.body;
		console.log("User:", user);
		if (!user.email || !user.displayName) {
			return res.status(400).send({ message: "Email and name are required" });
		}

		let existingUser = await prisma.user.findUnique({
			where: { email: user.email },
		});

		if (!existingUser) {
			existingUser = await prisma.user.create({
				data: {
					email: user.email,
					name: user.displayName,
					userPhoto: user.photoUrl,
				},
			});
		}

		const token = jwt.sign(
			{ userId: existingUser.id },
			process.env.secret || "defaultSecret",
			{
				expiresIn: "1h",
			}
		);

		await prisma.user.update({
			where: { email: user.email },
			data: { token },
		});

		res
			.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
			})
			.send({ success: true });
	} catch (error) {
		console.error("Error creating JWT token:", error);
		res.status(500).send({ message: "Internal server error" });
	}
};

const handleLogout = async (req, res) => {
	try {
		if (!req.body.email) {
			return res.status(400).send({ message: "Email is required for logout" });
		}

		const existingUser = await prisma.user.findUnique({
			where: { email: req.body.email },
		});
		if (!existingUser) {
			return res.status(404).send({ message: "User not found" });
		}

		await prisma.user.update({
			where: { email: req.body.email },
			data: { token: null },
		});

		res.clearCookie("token").send({ success: true });
	} catch (error) {
		console.error("Error handling logout:", error);
		res.status(500).send({ message: "Internal server error" });
	}
};

module.exports = {
	createJwtToken,
	handleLogout,
};
