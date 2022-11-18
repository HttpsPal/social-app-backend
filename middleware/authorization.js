const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
	console.log("You are being authenticated");
	try {
		const token = req.header("token");
		console.log(token);
		if (!token) {
			res.status(403).send("not authorized");
		} else {
			const payload = jwt.verify(token, process.env.SECRET);
			req.user = payload.user;
			next();
		}
	} catch (error) {
		console.log(error);
		res.status(403).send("not authorized");
	}
};
