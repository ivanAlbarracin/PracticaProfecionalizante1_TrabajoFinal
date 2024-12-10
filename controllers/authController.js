const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models'); // Importar los modelos
const Usuario = db.Usuario; // Acceder al modelo Usuario

const login = async(req, res) => {
    const { mail, password } = req.body;    

    try {
        //1 - Constatar que existe una cuenta con ese mail
        const usuario = await Usuario.findOne({ where: { mail } });
        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrada" });
        }
        //2 - Verificar password
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Password incorrecto" });
        }
        //3 - Crear token
        const token = jwt.sign({
            id: usuario.id,
            nombre: usuario.nombre,
            mail: usuario.mail
        }, "1234", { expiresIn: 180 });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({
            message: "Error en el servidor",
            tipo: error.name,
            detalles: error.message
        });
    }
}

module.exports = {
    login
}