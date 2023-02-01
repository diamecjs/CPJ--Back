const { Category } = require("../src/db");
const { SubCategory } = require("../src/db");

const path = require("path");
const fs = require("fs");

const loadCategory = async () => {
  try {
    const categories2 = await Category.findAll();
    if (categories2.length) {
      console.log("ya hay categorias");
      return;
    }
    const categories = JSON.parse(
      fs.readFileSync(path.join(__dirname, "./database/categories.json"))
    );
    await Category.bulkCreate(categories);
    console.log("categories cargados");
  } catch (error) {
    console.log(error);
  }
};

const loadSubCategory = async () => {
  try {
    const subCategories2 = await SubCategory.findAll();
    if (subCategories2.length) {
      console.log("ya hay sub categorias");
      return;
    }
    const subCategories = JSON.parse(
      fs.readFileSync(path.join(__dirname, "./database/subCategories.json"))
    );
    await SubCategory.bulkCreate(subCategories);
    console.log("Subcategories cargados");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
    loadCategory,
    loadSubCategory,
}
