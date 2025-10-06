const express = require("express")
const server = express()

const cursos = ['node.js', 'JavaScript', 'c#', 'java', 'react native', "python"];

//Criando rota 
//localhost:3000/curso
server.get("/curso/:index", (req, res) => {
    // return resposta.send("hello word")
    //Query params
    const nome = req.query.nome;

    //Route params
    const {index} = req.params;

    //retornando um objeto
    return res.json(cursos[index])
})

//Ouvindo essa porta
server.listen(3000)