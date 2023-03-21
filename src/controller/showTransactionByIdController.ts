import { Request, Response } from "express";
import ShowTransactionByIdUseCase from "../useCase/showTransactionByIdUseCase";

class ShowTransactionByIdController {
  async exec(request: Request, response: Response) {
    try {
      const { idTransaction } = request.params
      const {email} = request.body;
      if (!email || !idTransaction) {
        console.log("Missing param 'email' or 'idTransaction'");
        return response.status(400).json({ message: "Missing param 'id'" });
      }
      const useCase = new ShowTransactionByIdUseCase()
      const transaction = await useCase.exec(email,idTransaction);
      return response.status(200).json(transaction);
    } catch (error: any) {
      const ERROR = { name: error.name, message: error.message };
      return response.status(500).json(ERROR);
    }
  }
}
export default ShowTransactionByIdController;
