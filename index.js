const server = require('./src/app');
const { conn } = require('./src/db');
require("dotenv").config();

const {
 loadCategory,
 loadSubCategory
} = require("./src/loadDatabase");

const port = process.env.PORT || 3001;
// Syncing all the models at once
conn.sync({ force: false}).then(async () => {
    loadCategory();
    loadSubCategory();
    server.listen(port, () => {
        console.log(`servidor corriendo en puerto: ${port}`); // eslint-disable-line no-console
    });

});