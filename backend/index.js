const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorMiddleware");
mongoose.connect(
    "mongodb+srv://admin-sushant:singhsushant123@cluster0.qfvw8.mongodb.net/redcarpetDB",
    function (err) {
      if (err) console.log(err);
      console.log("DB connected");
    }
  );
const app=express();
app.use(cors());
app.use(errorHandler);
const port=process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/lists', require('./routes/listRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.listen(port,()=>console.log(`Server started on port ${port}`));

