const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const { connect } = require('mongoose');
require("dotenv").config();
const connectDb = require("./config/dbConnection.js")


const app = express();
connectDb()
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://satyanagendra11:<password>@satyacluster0.fntu1h9.mongodb.net/');

const port =  process.env.PORT || 5000;
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes")); //this is a middleware 
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server running on ${port}`);
});