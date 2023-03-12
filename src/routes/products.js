const { Router } = require("express");
const axios = require("axios");

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
      
          

      router.put('/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const { name, image, disponible, description, price, subCategory } = req.body;
      
          const response = await axios.put(`https://cpj-production.up.railway.app/products/${id}`, {
            name,
            image,
            disponible,
            description,
            price,
            subCategory,
          });
      
          const updatedProduct = response.data;
      
          res.status(200).json(updatedProduct);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error updating product' });
        }
      });
      
    module.exports = router;