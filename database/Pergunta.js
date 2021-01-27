const { Sequelize } = require('sequelize');
const Sequileze = require('sequelize');
const conexao = require('./conexao.js');


//definindo o model pergunta para o bd

//criando a minha tabela .define(nomeTabela, {campo das tabelas})
const Pergunta = conexao.define('perguntas',{

    //definindo os campos da minha tabela
    titulo: {
        type: Sequileze.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force : false}).then(()=>{});

module.exports = Pergunta;