import { Request, Response } from "express";
import { BadRequestError } from "../modules/errors/errors";
import SaveNewTransactionUseCase from "../useCase/saveNewTransactionUseCase";

class SaveNewTransactionController {
  async exec(request: Request, response: Response) {
    try {
      const { email, descricao, tipo, valor, ...rest } = request.body;

      if (!descricao || !tipo || !valor || !email) {
        console.log(
          "Missing param 'descricao' or/and 'tipo' or/and 'valor' or/and 'email'"
        );
        return response.status(400).json({
          message: "Missing param 'descricao' or/and 'tipo' or/and 'valor'",
        });
      }
      const useCase = new SaveNewTransactionUseCase();
      await useCase.exec(email, { descricao, tipo, valor });
      return response.status(201).json({ message: "Create" });
    }catch (error: any) {
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
export default SaveNewTransactionController;
