const logger = (req, res, next) => {
	console.log("Log Info:", req.method, req.url);
	next();
};

module.exports = logger;
