const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api',require('./routes'));

app.get('/', (req, res) => {
   res.send("Hello");
})

const server = app.listen(10000, function () {
   var port = server.address().port
   console.log("Server running at %s", port)
})