const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const moment = require("moment")

router.get('/',(req, res) => {
    
    var token_bearer = req.header("Bearer")


    Usuario.findById(token_bearer).then((result) => {
        var retorno = {}

        var valida_token = result.length  //Pegando o tamanho para saber se o email existe. Se o valor for = o e pq a lista esta vazia e o emial não existe

        if(valida_token == 0) {

            console.log("Não autorizado token não exite")

            retorno = {
                mensagem: "Não autorizado"
            } 

            res.status(401).send(retorno)
            
        } else {

            console.log("Token valido")

            var ultimo_login = moment(result.ultimo_login,'YYYY-MM-DD HH:mm')
            var login_atual  = moment()

            var valida_sessao = moment.duration( login_atual.diff(ultimo_login) )
            var valida_sessao_horas = valida_sessao.hours()
            var valida_sessao_minutos = valida_sessao.minutes()


            if( valida_sessao_horas == 0 && valida_sessao_minutos <= 30 ){
                
                retorno = {
                    mensagem: result.email                    
                }

                res.status(200).send(retorno)

            }else {

                console.log("Sessao invalida mais que 30 min ")

                retorno = {
                    mensagem: "Sessão inválida"                    
                } 
                
                res.status(401).send(retorno)
            }

        }
        
    }).catch((err) => {
        
        console.log("Erro ao buscar usuario" + err)

        var retorno_erro = {
            mensagem:  err.message
        }

        res.status(404).send(retorno_erro)
    })

})

module.exports = router
 