const express = require('express')
const server = express()

server.use(express.json());

const cursos = ['node.js', 'JavaScript', 'c#', 'java', 'react native', "python"];

//Middware Global
//passa pelo middware e segue o fluxo
server.use((req, res, next) => {
    console.log(`Url chamada ${req.url}`)
    return next();
})

function checandoCurso(req, res, next) {
    if (!req.body.nome) {
        return res.status(400).json({ error: "nome do curso é obrigatorio" })
    }

    //sem retorno não funciona
    return next()
}


function checandoIndexExistente(req,res) {
    const curso = cursos[req.params.index]
    if (!curso) {
        return res.status(400).json({ error: "usuario não existe" })
    }
}

//lista todos (read)
server.get("/curso", checandoIndexExistente,(req, res) => {
    return res.json(cursos)
})

//lista um unico curso (read)
server.get("/curso/:index", (req, res) => {
    const { index } = req.params;
    return res.json(cursos[index])
})

//criando um curso pelo corpo da requisição
server.post("/curso/criar", checandoCurso, (req, res) => {
    const { nome } = req.body;
    cursos.push(nome)

    return res.json(cursos)
})

server.put("/cursos/:index", checandoCurso, checandoIndexExistente,(req, res) => {
    const { index } = req.params
    const { nome } = req.body

    cursos[index] = nome;
    return res.json(cursos)
})


server.delete("/cursos/:index", checandoIndexExistente, (req, res) => {
    const { index } = req.params
    cursos.splice(index, 1)

    //return res.json(cursos)
    return res.json({ message: "curso deletado com sucesso" })

})

//escutando a porta 
server.listen(3000)