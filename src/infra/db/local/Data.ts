import IMovimentacaoBancaria from "../../../modules/dtos/IMovimentacaoBancariaDtio";

interface IContaCorrenteDto {
  banco: string;
  saldo: number;
  email:string
  movimentacaoBancaria: Array<IMovimentacaoBancaria>;
}

const contaCorrente: Array<IContaCorrenteDto> = [
  {
    banco: "Fullture of finances S.A.",
    saldo: 1000,
    email:"example@example.com",
    movimentacaoBancaria: [
      {
        id:'1',
        descricao:"Pix Ronei",
        valor:1000,
        tipo:"E",
        dataMovimentacao:"03/21/23, 06:03:38"
      }
    ],
  },
];
export default contaCorrente;
