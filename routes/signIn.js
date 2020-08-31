const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const moment = require("moment")

router.get('/', async (req, res) => {


    const login = {           
        email    : req.body.email ,    
        senha    : req.body.senha  
    }


    Usuario.find( {email: login.email, senha: login.senha} ).then((result) => {

        var valida_login = result.length  //Pegando o tamanho para saber se o email existe. Se o valor for = o e pq a lista esta vazia e o emial não existe

        if(valida_login == 0) {   

            console.log("Usuário e/ou senha inválidos")

            retorno = {
                mensagem: "Usuário e/ou senha inválidos"                    
            } 
            
            res.status(401).send(retorno)
            
        } else {

            console.log("Usuário logado com sucesso ")

            // Atualizando a data do ultimo login do usuarioIn
            Usuario.updateOne( {"_id": result[0]._id},{ $set: { ultimo_login: Date.now() } } ).then(() => {
                console.log("Sucesso ao atualizar data do ultimo login")
            }).catch((err) => {
                console.log("Erro ao atualizar data ultimo login " + err)
            })


            retorno = {
                id               : result[0]._id, 
                data_criacao     : moment(result[0].data_criacao     ,'YYYY-MM-DD HH:mm'),           
                data_atualizacao : moment(result[0].data_atualizacao ,'YYYY-MM-DD HH:mm'),              
                ultimo_login     : moment(result[0].ultimo_login     ,'YYYY-MM-DD HH:mm')         
            }

            res.status(200).send(retorno)
        }

    }).catch((err) => {
        console.log("Erro ao buscar usuário " + err)

        var retorno_erro = {
            mensagem:  err.message
        }
        
        res.status(404).send(retorno_erro)
    })

})

module.exports = router
 