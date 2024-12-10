const db = require("../models");
const Post= db.Post;

const create_post = async (req, res) => {
    const id_usuario=req.user.id;
    const {titulo, contenido} = req.body;
    if (!id_usuario || !titulo || !contenido) {
        return res.status(400).send({ message: "Faltan datos de completar" });
    }
    try {
        const post = await Post.create({
            id_usuario: id_usuario,
            titulo: titulo,
            contenido: contenido
        });
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send({
            message: error.message,
            nombre: error.name
        });   
    }
};

const list_post = async(req, res) => {
    try {
        const listaPost = await Post.findAll();

        if (listaPost.length > 0) {
            res.status(200).send(listaPost);
        } else {
            res.status(404).send({ message: "Aun no hay posteos" });
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
};

const delete_post = async (req, res) => {
    try {
        const postId = req.query.id;

        const post = await Post.destroy({
            where: { id: postId}
        });

        if (post) {
            res.status(200).send({ message: "¡Post eliminado correctamente!" });
        } else {
            res.status(404).send({ message: "No se encontró el post. Verifica el ID proporcionado." });
        }
    } catch (error) {
        res.status(500).send({ message: "Error interno del servidor", tipo: error.name, detalles: error.message });
    }
};

const update_post = async(req, res) => {
    try {
        const id = req.query.id;
        const { titulo, contenido} = req.body;
        
        const post = await Post.findByPk(id);
        if (!Post) {
            return res.status(404).send({ error: 'Post no encontrado' });
        }

        post.titulo = titulo;
        post.contenido = contenido;
        await post.save(); 
        
        res.status(200).send(post);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

const onePost = async(req, res) => {
    const id_usuario_login = req.user.id;
    const idPost= req.query.id

    const siguiendo = await db.Usuario.findByPk(id_usuario_login, {
        include: [{
            model: db.Usuario,
            as: 'seguidos', // Usa la relación "seguidos"
            attributes: ['id'],
            through: { 
                attributes:  [] 
            }
        }, ],
    });

    try {
        const post = await Post.findByPk(idPost);
        let encontrado= false;
        for (let i=0;i<siguiendo.seguidos.length;i++){
            if(post.id_usuario== siguiendo.seguidos[i].id){
                encontrado = true
            }
        }
        if (id_usuario_login == post.id_usuario||encontrado==true) {
            res.status(200).send(post);
        
        }else {
            res.status(404).send({ message: "No se puede mostrar este post" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error interno del server" });
    }
}


const userPost = async(req, res) => {
    const id_usuario_login= req.user.id;
    const id_usuario_seguido = req.query.id

    const siguiendo = await db.Usuario.findByPk(id_usuario_login, {
        include: [{
            model: db.Usuario,
            as: 'seguidos', // Usa la relación "seguidos"
            attributes: ['id'],
            through: { 
                attributes:  [] 
            }
        }, ],
    });

    try {
        const post = await Post.findAll({ 
            where: {
                id_usuario: id_usuario_seguido
        }});

        let encontrado= false;
        for (let i=0;i<siguiendo.seguidos.length;i++){
            if(id_usuario_seguido== siguiendo.seguidos[i].id){
                encontrado = true
            }
        }
        
        if (encontrado) {
            res.status(200).send(post);
        
        }else {
            res.status(404).send({ message: "No se pueden mostrar estos posts" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error interno del server" });
    }
}


module.exports ={
    create_post,
    list_post,
    delete_post,
    update_post,
    onePost,
    userPost
}
    
