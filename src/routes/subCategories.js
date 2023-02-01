const { Router } = require("express");
const axios = require("axios");
const { SubCategory, Category, Product } = require("../db");

const router = Router();

router.post("/", async (req, res) => {
  const { name, categories } = req.body;
  try {
    let subC = await SubCategory.findOne({ where: { name } });

    if (subC) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe esta sub categoria",
      });
    }

    const sub = await SubCategory.create({
      name,
    });
    const todoSub = await Product.findAll({
      include: [
        {
          model: Product,
          through: {
            attributes: ["name", "image"],
          },
        },
      ],
    });
    sub.addProduct(todoSub);

    return res.status(200).send(sub);
  } catch (error) {
    console.log("error en post/subCategories", error);
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
