const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const foodRouter = require("./routes/foodRouter");
const authRouter = require("./routes/authRouter");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

const app = express();

app.use(
	cors({
		origin: ["http://localhost:5173", "https://dibuang-sayang.web.app/"],
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.get("/", (req, res) => {
	res.send("hello world");
});
app.use("/api/foods", foodRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

module.exports = app;
