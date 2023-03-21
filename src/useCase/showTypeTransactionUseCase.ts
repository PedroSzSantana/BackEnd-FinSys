import Driver from "../driver/driverConnection";

class ShowTypeTransactionUseCase {
  private repository;
  constructor() {
    this.repository = new Driver().get();
  }
  async exec(email:string,tipo: string) {
    try {
      const Transaction = await this.repository.getByTipo(email,tipo);
      return Transaction;
    } catch (error) {
      throw error;
    }
  }
}
export default ShowTypeTransactionUseCase;
