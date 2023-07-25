const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/connection");
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//conexao com o banco
connection
    .authenticate()
    .then(()=>  {
        console.log("Conexão realizada com sucesso.");
    })
    .catch((error)=> {
        console.log(error);
    });

//perguntar
app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
});

//lista de perguntas
app.get("/",(req,res) => {
    Pergunta.findAll({
        raw: true,
         order: [['id', 'DESC']]
    }).then(perguntas =>{
        res.render("index", {
            perguntas: perguntas
         });
    });
});

//salvar perguntas no banco
app.post("/salvar",(req,res)=>{
    Pergunta.create({
        title: req.body.title,
        description: req.body.description
    }).then(()=>{
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req,res)=>{
    let id = req.params.id;
    Pergunta.findOne({where:{id: id}}).then(pergunta => {
      if(pergunta != undefined){

        Resposta.findAll({
            where: {answerId:id},
            order: [
                ['id', 'DESC']
            ]
        }).then(respostas=> {
            res.render("pergunta",{
                pergunta: pergunta,
                respostas:respostas
            });
        });

      } else{
        res.redirect("/");
      }
    });
});

app.post("/responder", (req,res)=>{
    Resposta.create({
        answerId: req.body.answerId,
        response: req.body.response
    }).then(()=>{
        res.redirect("/pergunta/:"+req.body.answerId);
    });
});

app.listen(8000,()=>{
    console.log("Servidor rodando.")
});