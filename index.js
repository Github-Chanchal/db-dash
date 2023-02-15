const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const connectDB = require("./services/mongodbService.js")
const  dbSchema = require("./models/dbModel");
const  orgSchema = require("./models/organizationModel");
const  userModel = require("./models/userModel");
const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//connect mongodb
connectDB();

app.use('/users',require("./routers/userRoute"))
app.use('/orgs',require("./routers/organizationRoute"))
app.use('/orgs',require("./routers/dbRoute"))
app.use('/dbs',require("./routers/tableRoute"))
app.use('/dbs',require("./routers/formRoute"))
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get("/", (req, res) => {
    res.send("Api working");      
  })
}


    
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
