
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import path from "path";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));


app.use("/", productRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
