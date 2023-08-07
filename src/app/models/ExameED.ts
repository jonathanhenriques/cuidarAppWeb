import { AtendenteED } from "./AtendenteED";
import { LocalED } from "./LocalED";
import { MedicoED } from "./MedicoED";
import { PacienteED } from "./PacienteED";

export class ExameED {
  public id: number | null;
  public nomeExame: string;
  public medico: MedicoED;
  public local: LocalED;
  public paciente: PacienteED | null;
  public dataExame: Date;
  public valor: number;
  public atendente: AtendenteED;
  public observacao: string;

  constructor() {
    this.id = null;
    this.nomeExame = '';
    this.medico = {
      id: 0,
      nome: '',
      isAtivo: true
    };
    this.local = {
      id: 0,
      nomeLocal: '',
    //   endereco: {
    //     endRua: '',
    //     endNumero: '',
    //     endBairro: '',
    //     endCidade: '',
    //     endTipoResidencia: '',
    //     endCep: '',
    //     endObservacao: '',
    // }
  }
    this.paciente = null;
    this.dataExame = new Date();
    this.valor = 0;
    this.atendente ={
      id: 0,
      nome: '',
      isAtivo: true,
    }
    this.observacao = '';
  }


}

// export function criaExameComPaciente(paciente: PacienteED): ExameED {
//   return {
//   id: null,
//   nomeExame: '',
//   medico: '',
//   local: '',
//   paciente:  paciente,
//   dataExame: new Date(),
//   valor: 0,
//   atendente: '',
//   observacao: ''

//   }
// }
