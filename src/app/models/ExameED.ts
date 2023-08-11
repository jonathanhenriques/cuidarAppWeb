import { AtendenteED } from "./AtendenteED";
import { EnderecoED } from "./EnderecoED";
import { LocalED } from "./LocalED";
import { MedicoED } from "./MedicoED";
import { PacienteED } from "./PacienteED";

export interface ExameED {
  id?: number;
  codigo?: string
  nomeExame: string;
  medico: MedicoED;
  local: LocalED;
  paciente?: PacienteED;
  dataExame: string;
  valor: number;
  atendente: AtendenteED;
  observacao: string;

}
