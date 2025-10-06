const express = require('express')
const server = express()

server.use(express.json());

const cursos = ['node.js', 'JavaScript', 'c#', 'java', 'react native', "python"];

//lista todos (read)
server.get("/curso", (req,res) => {
    return res.json(cursos)
})

//lista um unico curso (read)
server.get("/curso/:index", (req, res) => {
    const {index} = req.params;
    return res.json(cursos[index])
})

//criando um curso pelo corpo da requisição
server.post("/curso/criar", (req,res) =>{
    const { nome } = req.body;
    cursos.push(nome)

    return res.json(cursos)
})

server.put("/cursos/:index", (req,res) => {
    const {index} = req.params
    const {name} = req.body

    cursos[index] = name;

    return res.json(cursos)
})


server.delete("/cursos/:index", (req, res) =>{
    const {index} = req.params
    cursos.splice(index , 1)

    //return res.json(cursos)
    return res.json({message : "curso deletado com sucesso"})

})

//escutando a porta 
server.listen(3000)