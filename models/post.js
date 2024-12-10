const Post = (sequelize, Sequelize) => {
    return sequelize.define("Post", {
        id_usuario: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuarios', // Nombre de la tabla Usuario
                key: 'id', // Clave primaria del modelo Usuario
            },
            onUpdate: 'CASCADE', // Actualiza en cascada si cambia el id del usuario
            onDelete: 'CASCADE', // Elimina los posts si se elimina el usuario            
        },
        titulo: {
            type: Sequelize.STRING,
            allowNull: false,            
        }, 
        contenido: {
            type: Sequelize.TEXT,
            allowNull: false,            
        },         
    }, {
        timestamps: false,
    });
};

module.exports = Post;