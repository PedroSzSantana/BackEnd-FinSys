import { Router } from "express";
import ShowTransactionByIdController from "../controller/showTransactionByIdController";
import ShowAllTransactionController from "../controller/showAllTransactionController";
import ShowTypeTransactionController from "../controller/showTypeTransactionController";
import SaveNewTransactionController from "../controller/saveNewTransactionController";

const routes = Router();
const showTransactionIdController = new ShowTransactionByIdController
const showAllTransactionController = new ShowAllTransactionController
const showTypeTransactionController = new ShowTypeTransactionController
const saveNewTransactionController = new SaveNewTransactionController

routes.get("/getById/:idTransaction", showTransactionIdController.exec);
routes.get("/getAll",showAllTransactionController.exec);
routes.get("/getByTipo",showTypeTransactionController.exec);
routes.post("/newTransacao", saveNewTransactionController.exec);


export default routes