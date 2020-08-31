const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const moment = require("moment")
const bcrypt = require('bcryptjs')


router.post('/', async (req, res) => {

    // Pode ser enviado uma lista de telefone 
    var lista_telefone = []
    req.body.telefones.forEach(item => {

        lista_telefone.push(
            {
                numero: item.numero,
                ddd   : item.ddd
            }
        )
    })
    

    const novoUsuario = {        
        nome     : req.body.nome  ,    
        email    : req.body.email ,    
        senha    : req.body.senha ,    
        telefones: lista_telefone
    }
    
    Usuario.find( {email: novoUsuario.email} ).then((result) => {

        var retorno = {}

        var valida_email = result.length  //Pegando o tamanho para saber se o email existe. Se o valor for = o e pq a lista esta vazia e o emial não existe

        if(valida_email == 0) {
            
            new Usuario(novoUsuario).save().then( usuario_criado => {
                console.log("Usuário criado com sucesso! ")

                retorno = {
                    id               : usuario_criado._id, 
                    data_criacao     : moment(usuario_criado.data_criacao     ,'YYYY-MM-DD HH:mm'),           
                    data_atualizacao : moment(usuario_criado.data_atualizacao ,'YYYY-MM-DD HH:mm'),              
                    ultimo_login     : moment(usuario_criado.ultimo_login     ,'YYYY-MM-DD HH:mm')         
                }

                res.status(200).send(retorno)

            }).catch((err) => {
                console.log("Erro ao salvar usuário" + err)

                var retorno_erro = {
                    mensagem:  err.message
                }
                
                res.status(404).send(retorno_erro)
            })

        } else {

            console.log("Email existe! ")
            
            retorno = {
                mensagem: "E-mail já existente"
            } 

            res.status(409).send(retorno)
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
 