//! IMPORTS 
const express = require("express");

const app = express();
const cors = require('cors');

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! MONGOOSE 
require('./config/mongoose.config')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Routes = require('./routes/review.routes')
Routes(app)

app.listen(port, () => console.log(`Listening on port: ${port}`))