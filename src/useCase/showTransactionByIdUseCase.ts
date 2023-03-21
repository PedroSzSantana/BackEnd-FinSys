import Driver from "../driver/driverConnection";

class ShowTransactionByIdUseCase {
  private repository;
  constructor() {
    this.repository = new Driver().get();
  }
  async exec(email: string, idTransaction: string) {
    try {
      const transaction = await this.repository.getById(email, idTransaction);
      return transaction;
    } catch (error) {
      throw error;
    }
  }
}
export default ShowTransactionByIdUseCase;
