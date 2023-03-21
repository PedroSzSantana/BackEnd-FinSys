import { Request, Response } from "express";
import { BadRequestError } from "../modules/errors/errors";
import ShowTypeTransactionUseCase from "../useCase/showTypeTransactionUseCase";

class ShowTypeTransactionController {
  async exec(request: Request, response: Response) {
    try {
      const { email, tipo } = request.body;
      if (!tipo || !email) {
        console.log("Missig param 'tipo'");
        return response.status(400).json({ message: "Missig param 'tipo'" });
      }
      const useCase = new ShowTypeTransactionUseCase();
      const transactions = await useCase.exec(email, tipo);
      response.status(200).json(transactions);
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
export default ShowTypeTransactionController;
