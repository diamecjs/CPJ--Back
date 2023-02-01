const { Router } = require("express");
const axios = require("axios");
const { Product, SubCategory } = require("../db");



const router = Router();

router.post("/", async (req, res) => {

    const {name, image, subCategory} = req.body
    try{
    let newProduct= await Product.create({
        name, image
    })
    let sub = await SubCategory.findAll({
        where: {
            name: subCategory
        }
    })
    await newProduct.addSubCategory(sub)
    res.send('Nuevo Producto creado')

  } catch (error) {
    console.log("error en ruta post product", error);
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
    
    module.exports = router;