const Sequelize = require("sequelize");
const conexao = require("./conexao.js");

const Resposta = conexao.define('respostas',{

    corpo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

Resposta.sync({force : false});

module.exports = Resposta;