const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var telefone = {numero: Number, ddd: Number}

const Usuario = new Schema({
    
    nome: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    senha: {
        type: String,
        require: true
    },

    telefones: [telefone],

    data_criacao: {
        type: Date,
        default: Date.now()         //Pegando a data no mento do cadastro 
    },

    data_atualizacao: {
        type: Date,
        default: Date.now()         //Pegando a data no mento do cadastro 
    },

    ultimo_login: {
        type: Date,
        default: Date.now()         //Pegando a data no mento do cadastro 
    }

})

mongoose.model("usuarios", Usuario) 
