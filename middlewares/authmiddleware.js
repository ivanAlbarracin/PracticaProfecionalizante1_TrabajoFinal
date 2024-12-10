const jwt = require("jsonwebtoken");

const auth = (req, res, next) =>{

    const token = req.header("Authorization");

    if (!token){
        return res.status(401).send({message:"No hay Token"});
    }
    try {
        const verified = jwt.verify(token,"1234");
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({
            message: "token No valido",
            info: error.message,
        })
    }
}
module.exports = auth;