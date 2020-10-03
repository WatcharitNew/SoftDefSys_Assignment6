const express = require('express');
const router = express.Router();
const cors = require('cors');
const mysql = require('mysql');

router.use(cors());

// config for your database
const con = mysql.createConnection({
	host: process.env.HOST || 'db',
	user: process.env.USER,
	password: process.env.PASSWORD,
	port: process.env.PORT || 3306,
	database: process.env.DATABASE || "memory",
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

router.post('/', (req,res) => {
	const {name, memory} = req.body;
	console.log(name);
	console.log(memory);
	con.query(`INSERT INTO memory(username, detail) VALUES ('${name}','${memory}')`, function (err, result) {
		if (err) throw err;
		console.log('write successful');
	});
	con.query(`SELECT * FROM memory`, function (err, result) {
		if (err) throw err;
		res.send(result);
	});
});

module.exports = router;