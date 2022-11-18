const router = require("express").Router();
const database = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
	console.log("getting all posts");
	try {
		const allPosts = await database.any(`SELECT 
    posts.id,
    users.username,
    posts.message,
    posts.timestamp
    FROM posts JOIN users ON posts.user_id=users.id ORDER BY posts.timestamp DESC`);
		res.json(allPosts);
		console.log("query successful");
	} catch (error) {
		console.log(error.message);
		res.status(500).json("server error");
	}
});

router.post("/", authorization, async (req, res) => {
	try {
		const message = req.body.message.replaceAll("'", "''");
		console.log(message);
		const newPost = await database.any(
			`INSERT INTO posts(user_id, message, timestamp) VALUES (${req.user}, '${message}', now())`
		);

		res.json("new posts created");
	} catch (error) {
		console.log(error.message);
		res.status(500).json("server error");
	}
});

router.delete("/:id", authorization, async (req, res) => {
	try {
		const postToDelete = await database.any(
			`DELETE FROM posts WHERE id=${req.params.id}`
		);
		res.json(postToDelete);
	} catch (error) {
		console.log(error.message);
	}
});

router.patch("/:id", authorization, async (req, res) => {
	try {
		const message = req.body.message.replaceAll("'", "''");
		const postToUpdate = await database.any(
			`UPDATE posts SET message='${message}' WHERE id=${req.params.id}`
		);
		res.json(postToUpdate);
	} catch (error) {
		console.log(error.message);
	}
});

module.exports = router;
