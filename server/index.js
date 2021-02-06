import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();



const dbURI = "mongodb+srv://docsarea:1234@cluster0.egnnh.mongodb.net/travellersdiary?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(5000, () => console.log("server running on port 5000")))
  .catch(err => console.log(err));