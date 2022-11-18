const router = require("express").Router();
const database = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		const salt = await bcrypt.genSalt(10);
		const bcryptPassword = await bcrypt.hash(password, salt);
		database.any(
			`INSERT INTO users (username, password) VALUES ('${username}', '${bcryptPassword}')`
		);
		res.send("user created");
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await database.any(
			`SELECT * FROM users WHERE username='${username}'`
		);
		const validPassword = await bcrypt.compare(password, user[0].password);
		if (!validPassword) {
			res.status(401).send("invalid credentials");
		} else {
			const token = jwtGenerator(user[0].id);
			res.json({ token });
		}
	} catch (error) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

router.get("/verified", authorization, async (req, res) => {
	try {
		res.json(true);
	} catch (error) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
