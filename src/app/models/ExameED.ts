import { PacienteED } from "./PacienteED";

export class ExameED {
  public id: number | null;
  public nomeExame: string;
  public medico: string;
  public local: string;
  public paciente: PacienteED | null;
  public dataExame: Date;
  public valor: number;
  public atendente: string;
  public observacao: string;

  constructor() {
    this.id = null;
    this.nomeExame = '';
    this.medico = '';
    this.local = '';
    this.paciente = null;
    this.dataExame = new Date();
    this.valor = 0;
    this.atendente ='';
    this.observacao = '';
  }


}

export function criaExameComPaciente(paciente: PacienteED): ExameED {
  return {
  id: null,
  nomeExame: '',
  medico: '',
  local: '',
  paciente:  paciente,
  dataExame: new Date(),
  valor: 0,
  atendente: '',
  observacao: ''

  }
}
