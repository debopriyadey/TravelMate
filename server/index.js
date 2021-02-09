import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import getRoutes from './routes/reviews.js';

const app = express();

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/ReviewForm', getRoutes);


const dbURI = "mongodb+srv://docsarea:1234@cluster0.egnnh.mongodb.net/travellersdiary?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(5000, () => console.log("server running on port 5000")))
  .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);