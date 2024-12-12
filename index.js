const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;
const swaggerUi = require("swagger-ui-express"); //Para swagger
const swaggerDocs = require("./swaggerConfig"); // Para swagger
const path = require("path");

const usuarioRouter = require("./routes/usuarioRoutes");
const followingRouter = require("./routes/followingRoutes");
const postRouter= require("./routes/postRoutes");

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); //Ruta swagger

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/usuarios", usuarioRouter);
app.use("/api/followings", followingRouter);
app.use("/api/post", postRouter);



app.listen(PORT, () => {
    console.log(`Aplicacion corriendo en puerto ${PORT}`);
})