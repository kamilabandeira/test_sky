// Carregando modulos
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const buscar = require("./routes/buscar_usuario")
const signIn = require("./routes/signIn")
const signUp = require("./routes/signUp")
const mongoose = require('mongoose')
// const cors = require('cors')

// Configurações
    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())

    // Mongoose
        mongoose.Promise = global.Promise; 
        mongoose.connect("mongodb://localhost/cadastro").then(() => {
            console.log("Conectado ao mongo")
        }).catch((err) => {
            console.log("Erro ao se conectar: " + err)
        })

//Rotas
    app.use("/buscar_usuario", buscar)
    app.use("/signIn", signIn)
    app.use("/signUp", signUp)

//Outros
const PORT = 9002
app.listen(PORT,() => {
    console.log("Servidor rodando! " + PORT)
})
 