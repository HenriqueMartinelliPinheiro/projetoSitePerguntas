const { DataTypes } = require("sequelize");
const connection = require("./connection");

const Resposta = connection.define('resposta',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true    
    },
    answerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    response: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

Resposta.sync({force: false})
    .then(()=>{
        console.log("Tabela criada com sucesso.")
    });

module.exports = Resposta;
