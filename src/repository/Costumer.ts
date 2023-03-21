import IMovimentacaoBancaria from "../modules/dtos/IMovimentacaoBancariaDtio";
import { BadRequestError } from "../modules/errors/errors";
import TransactionModel from "../models/Transaction";
import mongoose from "mongoose";
import moment from "moment";

class Costumer {
  private transactionModel
  constructor(){
    this.transactionModel = TransactionModel
  }
  private async verifyClient(email:string){
    try{
      const user = await this.transactionModel.findOne({ email})
      if (!user) {
        throw new BadRequestError("Usuario não encontrado.");
      }
    }catch(error){
      throw error
    }
  }
  async getById(email: string, idTransaction: string) {
    try {
      this.verifyClient(email)
      const transaction = await this.transactionModel.findOne(
        { email, "movimentacaoBancaria._id": idTransaction },
        { "movimentacaoBancaria.$": 1 }
      );
      const movimentacaoBancaria = transaction!.movimentacaoBancaria[0];
      if (!movimentacaoBancaria) {
        throw new BadRequestError("Movimentação bancária não encontrada.");
      }
      return movimentacaoBancaria;
    } catch (error) {
      throw error;
    }
  }
  async getAll(email: string) {
    try {
      this.verifyClient(email)
      const getAll = await this.transactionModel.find({ email },{ movimentacaoBancaria: 1, _id: 0 });
      return getAll;
    } catch (error) {
      throw error;
    }
  }
  async getByTipo(email: string, tipo: string) {
    try {
      this.verifyClient(email)
      const getByTipo = await this.transactionModel.find(
        { email, "movimentacaoBancaria.tipo": tipo},
        { movimentacaoBancaria: 1 }
      );
      return getByTipo;
    } catch (error) {
      throw error;
    }
  }
  async TipoSaida(email: string,{ descricao, tipo, valor }: IMovimentacaoBancaria) {
    try {
      this.verifyClient(email)
      const filter = { email };
      const result = await this.transactionModel.findOne(filter);

      let newSaldo = result!.saldo! - valor;
      console.log(newSaldo);
      if (newSaldo < 0) {
        console.log("Saldo Insuficiente");
        throw new BadRequestError("Saldo Insuficiente");
      }
      const update = { $inc: { saldo: -valor } };
      await this.transactionModel.updateOne(filter, update);
      await this.postNovaTransacao(email, { descricao, tipo, valor });
    
    } catch (error) {
      throw error;
    }
  }
  async TipoEntrada(email: string,{ descricao, tipo, valor }: IMovimentacaoBancaria) {
    try {
      this.verifyClient(email)
      const filter = { email };
      const update = { $inc: { saldo: +valor } };
      await this.transactionModel.updateOne(filter, update);
      await this.postNovaTransacao(email, { descricao, tipo, valor });
    
    } catch (error) {
      throw error;
    }
  }
  async postNovaTransacao(email: string,{ descricao, tipo, valor }: IMovimentacaoBancaria) {
    try {
      const newMovement = {
        _id: new mongoose.Types.ObjectId(),
        descricao,
        valor,
        tipo,
        dataMovimentacao: moment().format("MM/DD/YY, hh:mm:ss"),
      };
      await this.transactionModel.findOneAndUpdate(
        { email },
        { $push: { movimentacaoBancaria: newMovement } }
      );
    } catch (error) {
      throw error;
    }
  }
}

export default Costumer;
