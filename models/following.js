const Following = (sequelize, Sequelize) => {
    return sequelize.define('Following', {
        id_usuario: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuarios', // Nombre de la tabla a la que se hace referencia
                key: 'id', // Clave primaria de la tabla Usuarios
            },
        },
        id_usuario_seguido: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuarios', // Nombre de la tabla a la que se hace referencia
                key: 'id', // Clave primaria de la tabla Usuarios
            },
        },
    }, {
        timestamps: true,
        // Preguntale a chatGPT        
        indexes: [{
            unique: true,
            fields: ['id_usuario', 'id_usuario_seguido'],
        }, ],
    });
};

module.exports = Following;