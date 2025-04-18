import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find();
    res.render("index", { products });
});


router.get("/new", (req, res) => {
    res.render("new");
});


router.post("/products", async (req, res) => {
    await Product.create(req.body);
    res.redirect("/");
});


router.get("/products/:id/edit", async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render("edit", { product });
});


router.post("/products/:id", async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
});

router.post("/products/:id/delete", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

export default router;
