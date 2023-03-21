import Driver from "../driver/driverConnection";

class ShowAllTransactionUseCase {
  private repository;
  constructor() {
    this.repository = new Driver().get();
  }
  async exec(email: string) {
    try {
      const transactions = await this.repository.getAll(email);
      return transactions;
    } catch (error) {
      throw error;
    }
  }
}
export default ShowAllTransactionUseCase;
