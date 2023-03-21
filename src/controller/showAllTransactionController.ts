import { Request, Response } from "express";
import ShowAllTransactionUseCase from "../useCase/showAllTransactionUseCase";
import { BadRequestError } from "../modules/errors/errors";

class ShowAllTransactionController {
  async exec(request: Request, response: Response) {
    try {
      const { email } = request.body;
      if (!email) {
        return response.status(400).json({ message: "Missing param 'email'." });
      }
      const useCase = new ShowAllTransactionUseCase();
      const transactions = await useCase.exec(email);
      return response.status(200).json(transactions);
    } catch (error: any) {
      const ERROR = { name: error.name, message: error.message };
      switch (error.constructor) {
        case BadRequestError:
          response.status(400).json(ERROR);
          break;
        default:
          response.status(500).json(ERROR);
          break;
      }
    }
  }
}
export default ShowAllTransactionController;
