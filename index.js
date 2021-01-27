const express = require("express");
const app = express();

const bodyparser = require("body-parser");

const conexao = require("./database/conexao");

//criando a tabela pergunta no bd
const Pergunta = require("./database/Pergunta");

conexao
    .authenticate()
    .then(()=>{
        console.log("BD ON");
    })
    .catch(err=>{
        console.log('BD off');
    })
//Configurando o EJS como engine view do express
app.set('view engine','ejs');

//Configurando diretorio dos arquivos estaticos do sistema. ex: css, imagens, etc.
app.use(express.static('public'));

//Configurando body-parser para receber os dados enviados pelo formulario
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json()); //permite que a API entenda dados enviados no formato JSON


//DEFININDO ROTAS
app.get("/",(req,res) => {
    Pergunta.findAll({
        raw: true, //serve para trazer apenas as informações necessarias
        order:[   //ordenar a forma de listagem do resultado do bd
        ['id','desc'] //['coluna do bd', 'forma de listagem ASC OU DESC']
        ]
    }).then(perguntas => {
        res.render("index",{
            perguntas
        });
    });
    
});

app.get("/perguntar",(req,res)=>{
    res.render('perguntar');
});

app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id;
    Pergunta.findOne({
        where:{id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            res.render("pergunta",{
                pergunta
            });
        }else{
           res.redirect("/"); 
        }
    })
})

app.post("/salvarpergunta",(req,res)=>{

    //recebendo dados do formulario
    var titulo = req.body.titulo;
    var descricao = req.body.pergunta;

    //adicionando os dados ao banco de dados
    Pergunta.create({
        titulo,
        descricao
    }).then(()=>{
        //apos terminar de adicionar redireciona o usuario para a home
        res.redirect("/")
    })

    
})



//INICIANDO SERVIDOR


app.listen(4000, err=>{
    if(err){
        console.log('O servidor deu erro');
    }else{
        console.log('O servidor está on e roteando')
    }
})