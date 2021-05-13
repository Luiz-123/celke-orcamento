const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X_PINGOTHER, Content-Type,Authorization");
    app.use(cors());
    next();
});

require('./models/home');
const Home = mongoose.model('Home');

require('./models/orcamento');
const Orcamento = mongoose.model('Orcamento');

//Senha Umbler: abcde12345

/*
//Conexão com o banco de dados local
mongoose.connect('mongodb://localhost:27017/celke', {useNewUrlParser: true, 
*/

//Conexão com o banco de dados Umbler
mongoose.connect('mongodb://orion:abcde12345@mongo_orion:27017/orion', {useNewUrlParser: true, 
useUnifiedTopology: true}).then(()=>{
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((err)=>{
    console.log("Erro ao conectar MongoDB!");
})


app.get('/home', async (req, res) => {
    await Home.findOne({}).then((home) =>{
        return res.json({
            error: false,
            home
        });
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Erro: Nenhum registro encontrado!"
        });
    });
});


app.post('/home', async (req, res) => {
    const dados = {
        "topTitulo": "Temos a solução que a sua empresa precisa!",
        "topSubTitulo": "This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.",
        "topTextoBtn": "Orçamento",
        "topLinkBtn": "/orcamento",
        "serTitulo": "Serviços",
        "serSubtitulo": "Sed sollicitudin nunc diam, ut dictum leo bibendum",
        "serUmIcone": "laptop-code",
        "serUmTitulo": "Serviço um",
        "serUmDesc": "Duis eget accumsan arcu. Sed imperdiet justo enim, ullamcorper semper enim tincidunt ",
        "serDoisIcone": "mobile-alt",
        "serDoisTitulo": "Serviço dois",
        "serDoisDesc": "Proin ac felis in orci sodales tincidunt. Suspendisse odio felis, vulputate non laoreet",
        "serTresIcone": "network-wired",
        "serTresTitulo": "Serviço três",
        "serTresDesc": "Cras quam leo, convallis fringilla venenatis vel, finibus nec odio. Praesent vulputate nisi sit",
    }

    const homeExiste = await Home.findOne({});
    if(homeExiste){
    return res.status(400).json({
        error: true,
        message: "Erro: A página Home já possui um registro cadastrado!"
    });
    }

    await Home.create(dados, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Conteúdo da página Home não cadastrado!"
        });
    });
    return res.json({
        error: false,
        message: "Página Home cadastrada com sucesso!"
    });
    
});


app.post('/orcamento', async (req, res) => {   
    
   /* await sleep(3000);
    function sleep(ms){
        return new mongoose.Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    };*/
    
    await Orcamento.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Orçamento não cadastrado!"
        });
    });
    return res.json({
        error: false,
        message: "Solicitação de orçamento enviado com sucesso!"
    });
    
});




/*
//Conexão com a porta do servidor local
app.listen(8081,function(){
    console.log("Servidor iniciou na porta 8081: http://localhost:8081");
});
*/


//Conexão com a porta do servidor Umbler
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Umbler listening on port %s', port);
    console.log("Servidor iniciou na porta" + port + " : http://luizc04api-com-br.umbler.net");
});

