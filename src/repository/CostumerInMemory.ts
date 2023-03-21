import moment from "moment";
import contaCorrente from "../infra/db/local/Data";
import IMovimentacaoBancaria from "../modules/dtos/IMovimentacaoBancariaDtio";
import { BadRequestError } from "../modules/errors/errors";

class CostumerInMemory {
  getById(email: string, idTransaction: string) {
    try {
      const getById = contaCorrente.map((param) => {
        const Index = param.movimentacaoBancaria.findIndex(
          (element) => element.id === idTransaction
        );
        if (Index === -1) {
          throw new BadRequestError("Movimentação não encontrada");
        }
        return param.movimentacaoBancaria.find((item) => item.id === idTransaction);
      });
      return getById;
      
    } catch (error) {
      throw error;
    }
  }
  getAll(email:string) {
    const transactions = contaCorrente.map((param) => {
      return param.movimentacaoBancaria;
    });
    return transactions;
  }
  getByTipo(email:string,tipo: string) {
    const transactions = contaCorrente.map((param) => {
      return param.movimentacaoBancaria.filter((item) => item.tipo === tipo);
    });
    return transactions;
  }
  TipoSaida(email:string, { descricao, tipo, valor }: IMovimentacaoBancaria){
    contaCorrente.map((Param) => {
        let ValorTransacao = valor;
        let SaldoAtual = Param.saldo;
        let novoSaldo = SaldoAtual - ValorTransacao;
        if (novoSaldo < 0) {
          console.log("Saldo Insuficiente");
          throw new BadRequestError("Saldo Insuficiente");
        }
        Param.saldo = novoSaldo;
      });
      this.postNovaTransacao({ descricao, tipo, valor })
  }
  TipoEntrada(email:string, { descricao, tipo, valor }: IMovimentacaoBancaria) {
    contaCorrente.map((Param) => {
        let ValueTransacao = valor;
        let SaldoAtual = Param.saldo;
        let novoSaldo = SaldoAtual + ValueTransacao;
        Param.saldo = novoSaldo;
    });
    this.postNovaTransacao({ descricao, tipo, valor })
  }
  postNovaTransacao({ descricao, tipo, valor }: IMovimentacaoBancaria){
    contaCorrente.map((Param) =>{
    const NewId = Param.movimentacaoBancaria.length + 1;
    Param.movimentacaoBancaria.push({
      id: NewId,
      descricao,
      tipo,
      valor,
      dataMovimentacao: moment().format("MM/DD/YY, hh:mm:ss"),
    });
  })
  }
  SaldoCorreto() {
    let TotalEntrada = 0;
    let TotalSaidas = 0;
    let Saldo = 0;
    contaCorrente.map((param) => {
      Saldo = param.saldo;
      param.movimentacaoBancaria.map((item) => {
        if (item.tipo === "E") {
          TotalEntrada += item.valor;
        }
        if (item.tipo === "S") {
          TotalSaidas += item.valor;
        }
      });
    });
    let SaldoTotalEsperado = TotalEntrada - TotalSaidas;

    console.log({ TotalEntrada, TotalSaidas, Saldo, SaldoTotalEsperado });
  }
}
export default CostumerInMemory;
