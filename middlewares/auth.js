const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).send({ message: "Unauthorized Access!" });
		}
		const decoded = await jwt.verify(token, process.env.secret);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(403).send({ message: "Forbidden Access!" });
	}
};

module.exports = verifyToken;
