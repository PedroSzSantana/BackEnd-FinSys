import { Schema, model } from "mongoose";

const TransactionModel = new  Schema({
    banco:{
        type:String,
        require:true
    },
    saldo:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    movimentacaoBancaria:[
        {
            _id:{
                type:String,
                required:true
            },
            descricao:{
                type:String,
                required:true
            },
            valor:{
                type:Number,
                required:true
            },
            tipo:{
                type:String,
                required:true
            },
            dataMovimentacao:{
                type:String,
                required:true
            }
        }
    ]
},{timestamps:true})
export default model("Clients",TransactionModel)