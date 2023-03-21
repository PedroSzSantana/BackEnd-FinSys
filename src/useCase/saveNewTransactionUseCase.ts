import IMovimentacaoBancaria from "../modules/dtos/IMovimentacaoBancariaDtio";
import { BadRequestError } from "../modules/errors/errors";
import Driver from "../driver/driverConnection";

class SaveNewTransactionUseCase {
  private repository;
  constructor() {
    this.repository = new Driver().get();
  }
  async exec(email: string, { descricao, tipo, valor }: IMovimentacaoBancaria) {
    try {
      const Descricao = descricao.split("");
      if (Descricao.length > 20) {
        throw new BadRequestError(
          "Param 'descricao' very long only max 20 caracter"
        );
      }
      switch (tipo) {
        case "S":
          await this.repository.TipoSaida(email, { descricao, tipo, valor });
          break;
        case "E":
          await this.repository.TipoEntrada(email, { descricao, tipo, valor });
          break;
        default:
          throw new BadRequestError("Param 'tipo' incorrect only 'S' or 'E'");
      }
    } catch (error) {
      throw error;
    }
  }
}
export default SaveNewTransactionUseCase;
