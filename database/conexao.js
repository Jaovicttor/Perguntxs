//Script para a criação da conexão do sistema com o bd 

const Sequeleze = require('sequelize');

//criando conexão com o bd usando a classe Sequelize
// new Sequeleze('nomeBD','usuarioBD','senhaBD',{
// host : servidor onde esta rodando o bd 
// dialect: qual o tipo de BD (mysql,postgres,mongoDB,etc)   
//})
const conexao = new Sequeleze('perguntxs','root','',{
    host : 'localhost',
    dialect : 'mysql'
});

module.exports = conexao;