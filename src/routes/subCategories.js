const { Router } = require("express");
const axios = require("axios");
const { SubCategory, Category, Product } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
  const { name, category} = req.body;
  try {
    const subCategory = await SubCategory.create({
      name,
     category,
    });

    return res.status(200).send(subCategory);
  } catch (error) {
    console.error("Error en POST /subCategory:", error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
});


router.get("/", async (req, res) => {
  try {
    const allSubCategories = await SubCategory.findAll({
      include: Product,
    });
    res.status(200).json(allSubCategories);
  } catch (error) {
    res.status(400).json({ error: "No se encontró sub categoria" });
  }
});

module.exports = router;
