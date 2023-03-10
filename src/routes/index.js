const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const categories = require("./categories.js");
const subCategories = require("./subCategories.js");
const products = require('./products.js')




const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/categories', categories);
router.use('/subCategories', subCategories);
router.use('/products', products)



module.exports = router;