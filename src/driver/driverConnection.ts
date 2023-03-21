import Costumer from "../repository/Costumer";
import CostumerInMemory from "../repository/CostumerInMemory";
class Driver {
  public repository;
  constructor() {
    const DRIVER = process.env.DRIVER_CONNECTION;
    console.log(DRIVER);
    switch (DRIVER) {
      case "MONGODB":
        this.repository = new Costumer();
        break;
      case "LOCAL":
        this.repository = new CostumerInMemory();
        break;
      default:
        throw new Error("Error connection driver");
    }
  }
  get() {
    return this.repository;
  }
}
export default Driver;
