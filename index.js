const express = require("express");
const app = express();

const bodyparser = require("body-parser");

const conexao = require("./database/conexao");

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
app.get("/",(req,res)=>{
    res.render('index');
});

app.get("/perguntar",(req,res)=>{
    res.render('perguntar');
});

app.post("/salvarpergunta",(req,res)=>{
    var titulo = req.body.titulo;
    var descri = req.body.pergunta;
    res.send(req.body);
})



//INICIANDO SERVIDOR


app.listen(4000, err=>{
    if(err){
        console.log('O servidor deu erro');
    }else{
        console.log('O servidor está on e roteando')
    }
})