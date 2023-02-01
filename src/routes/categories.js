const { Router } = require("express");
const axios = require("axios");
const { Category, SubCategory } = require("../db");

const router = Router();


router.get("/", async (req, res) => {
  try {
    const category = await Category.findAll({
      include: SubCategory,
    });

    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro la categoria",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "Lista de categorias",
      category,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
});

module.exports = router;