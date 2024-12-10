const bcrypt = require("bcrypt");

const Usuario = (sequelize, Sequelize) => {
    return sequelize.define("Usuario", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        nickname: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
        hooks: {
            beforeCreate: async(Usuario) => {
                if (Usuario.password) {
                    const salt = await bcrypt.genSalt(10);
                    Usuario.password = await bcrypt.hash(Usuario.password, salt);
                }
            },
            beforeUpdate: async(Usuario) => {
                if (Usuario.changed("password")) {
                    const salt = await bcrypt.genSalt(10);
                    Usuario.password = await bcrypt.hash(Usuario.password, salt);
                }
            },
        },
    })
}

module.exports = Usuario;