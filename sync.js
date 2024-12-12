const db = require("./models");

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log("Sincronizacion exitosa!!!!");
    })
    .catch((error) => {
        console.error("Fallo la sincro", error);
    })