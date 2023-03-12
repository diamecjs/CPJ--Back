const { Router } = require("express");
const axios = require("axios");
import fetch from "node-fetch";
const { Product, SubCategory } = require("../db");



const router = Router();

router.post("/", async (req, res) => {
  const { name, image, description, disponible, subCategory, price} = req.body;
  try {
    const product = await Product.create({
      name,
      image,
      description,
      disponible,
      subCategory,
      price,
    });

    return res.status(200).send(product);
  } catch (error) {
    console.error("Error en POST /product:", error);
    return res.status(500).send({ message: "Error en el servidor" });
  }
});


router.get("/", async (req, res) => {
    
  try {
      const products = await Product.findAll();{
          where: { name: products }
      }

      if (!products) {
          return res.status(404).json({
              ok: false,
              msg: 'No se encontraron productos',
          });
      }

      res.status(200).json({
          ok: true,
          msg: 'Lista de productos',
          products,
      });

  } catch (error) {
      console.log(error);
      res.status(500).json({
          ok: false,
          msg: 'Por favor hable con el administrador',
      });
  }
});

    router.delete("/:id", async (req, res) => {
        const { id } = req.params;
        try {
          await Product.destroy({
            where: { id },
          });
          res.send("Borrado.");
        } catch (error) {
          console.log("error en ruta delete product");
        }
      });
      
          

      router.put("/:id", async (req, res) => {
        const { id } = req.params;
        const datos = req.body;
        try {
          let result = await fetch(`https://ferreteria-cpj.herokuapp.com/products/${id}`, {
            method: "PUT",
            body: JSON.stringify(datos),
            headers: { "Content-Type": "application/json" },
          });
          let data = await result.json();
          return res.send(data);
        } catch (error) {
          console.log("Error en ruta PUT: ", error);
        }
      });
      
    module.exports = router;