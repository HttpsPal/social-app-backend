const pgOptions = {
	error: (err, e) => {
		console.log(`# Database Connection: ${e.cn}`);
		console.log(`# Database Event: ${err.message}`);
	},
};
const pgp = require("pg-promise")(pgOptions);
const dbAuth = require("./dblogin.js");

const connection = `postgres://postgres:${dbAuth[1]}@localhost:5432/${dbAuth[0]}`;
const db = pgp(connection);

db.connect()
	.then((obj) => {
		obj.done();
		console.log(`# Database Connection established`);
	})
	.catch((err) => {
		console.error(`# Database Error: ${err.message}`);
	});

module.exports = db;
