const { DataTypes } = require("sequelize");
const connection = require("./connection");

const Pergunta = connection.define('pergunta',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true    
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

Pergunta.sync({force: false})
    .then(()=>{
        console.log("Tabela criada com sucesso.")
    });

module.exports = Pergunta;
