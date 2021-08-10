const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const reviewRoute = require('./routes/review');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions))
// simulate delay response
// app.use((req, res, next) => { 
//   setTimeout(() => next(), 3000);
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST")
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  next();
})

console.log("hello")
app.use('/', authRoute);
app.use('/', reviewRoute);
app.use(errorHandler);

app.post('/get-cookie', (req, res) => {
  res.cookie("test", "test-true")
  const cookies = req.cookies;
  console.log(cookies.test);
  res.json(cookies);
})

const PORT = process.env.PORT || 5000
//const dbURI ="mongodb://localhost/travellersdiary";

const dbURI = "mongodb+srv://docsarea:1234@cluster0.egnnh.mongodb.net/travellersdiary?retryWrites=true&w=majority";
// const dbURI ="mongodb://localhost/travellersdiary";
// 'mongodb://localhost/node-api'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(PORT, () => console.log("server running on port 5000")))
  .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);