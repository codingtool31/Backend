const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require("./routes/TaskRoutes")

require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB is connected")
    )
    .catch((err => console.log(err)))

app.use("/api", routes);

app.listen(port, () => console.log(`Server is running at ${port}`));