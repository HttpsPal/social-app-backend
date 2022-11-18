const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`--- SERVER STARTED ON PORT ${PORT} ---`);
});

app.use("/auth", require("./routes/authRoutes"));
app.use("/", require("./routes/postRoutes"));

// app.get("/", (req, res) => {
// 	console.log("ACCESSING HOME PAGE");
// 	res.send("Hello world!");
// });

// //READ
// app.get("/posts", async (req, res) => {
// 	try {
// 		console.log("GETTING ALL POSTS");
// 		const allPosts = await pool.query("SELECT * FROM posts;");
// 		res.json(allPosts.rows);
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// });

// // CREATE
// app.post("/posts", async (req, res) => {
// 	try {
// 		console.log(`ADDING NEW POST: ${req.body.message} ${req.body.user_id}`);
// 		const addPost = await pool.query(
// 			`INSERT INTO posts (
//         user_id,
//         message,
//         timestamp
//         ) VALUES (
//           ${req.body.user_id},
//           '${req.body.message}',
//           now()
//       );`
// 		);
// 		res.json(addPost);
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// });

// // UPDATE
// app.put("/posts/:id", async (req, res) => {
// 	try {
// 		console.log(`UPDATING POST ${req.params.id}`);
// 		const updatePost = await pool.query(
// 			`UPDATE posts
//       SET message='${req.body.message}'
//       WHERE id=${req.params.id}`
// 		);
// 		res.json(updatePost);
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// });

// // DELETE
// app.delete("/posts/:id", async (req, res) => {
// 	try {
// 		console.log(`DELETING POST ${req.params.id}`);
// 		const deletePost = await pool.query(
// 			`DELETE FROM posts WHERE id=${req.params.id}`
// 		);
// 		res.json(deletePost);
// 	} catch (err) {
// 		console.error(err.message);
// 	}
// });
