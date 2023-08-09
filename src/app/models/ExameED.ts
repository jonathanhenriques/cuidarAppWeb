import { AtendenteED } from "./AtendenteED";
import { LocalED } from "./LocalED";
import { MedicoED } from "./MedicoED";
import { PacienteED } from "./PacienteED";

export interface ExameED {
  id?: number | null;
  codigo?: string
  nomeExame: string;
  medico: MedicoED;
  local: LocalED;
  paciente?: PacienteED;
  dataExame: string;
  valor: number;
  atendente: AtendenteED;
  observacao: string;

//   constructor() {
//     this.id = null;
//     this.nomeExame = '';
//     this.medico = {
//       id: 0,
//       nome: '',
//       isAtivo: true
//     };
//     this.local = {
//       id: 0,
//       nomeLocal: '',
//     //   endereco: {
//     //     endRua: '',
//     //     endNumero: '',
//     //     endBairro: '',
//     //     endCidade: '',
//     //     endTipoResidencia: '',
//     //     endCep: '',
//     //     endObservacao: '',
//     // }
//   }
//     this.paciente = null;
//     this.dataExame = new Date();
//     this.valor = 0;
//     this.atendente ={
//       id: 0,
//       nome: '',
//       isAtivo: true,
//     }
//     this.observacao = '';
//   }


// }

// // export function criaExameComPaciente(paciente: PacienteED): ExameED {
// //   return {
// //   id: null,
// //   nomeExame: '',
// //   medico: '',
// //   local: '',
// //   paciente:  paciente,
// //   dataExame: new Date(),
// //   valor: 0,
// //   atendente: '',
// //   observacao: ''

// //   }
}
