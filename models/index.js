const { Sequelize } = require("sequelize");
const parameters = require("../config/config");

const sequelize = new Sequelize(
    parameters.database,
    parameters.username,
    parameters.password, {
        host: parameters.host,
        dialect: parameters.dialect,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = require('./usuario')(sequelize, Sequelize);
db.Following = require('./following')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);

// Relaciones entre modelos
db.Usuario.hasMany(db.Post, { foreignKey: 'id_usuario' });
db.Post.belongsTo(db.Usuario, { foreignKey: 'id_usuario' });

// Establecer relaciones
db.Usuario.belongsToMany(db.Usuario, {
    through: db.Following,
    as: 'seguidos', // Alias para los seguidores de un usuario
    foreignKey: 'id_usuario', // Clave foránea que referencia al usuario que se sigue
    otherKey: 'id_usuario_seguido' // Clave foránea que referencia al que sigue
});

db.Usuario.belongsToMany(db.Usuario, {
    through: db.Following,
    as: 'seguidores', // Alias para los usuarios que un usuario está siguiendo
    foreignKey: 'id_usuario_seguido', // Clave foránea que referencia al usuario que sigue
    otherKey: 'id_usuario' // Clave foránea que referencia al usuario que esta siendo seguido
});

module.exports = db;