import { ContatoED } from "./ContatoED";
import { EnderecoED } from "./EnderecoED";
import { ExameED } from "./ExameED";

export interface PacienteED {
  id?: number;
  codigo?: string
  nome: string;
  dataNasc: string;
  idade: number;
  rg: string;
  estadoCivil: string;
  filhos: number;
  nomeResponsavelPaciente: string;
  contato: ContatoED;
  profissao: string;
  endereco: EnderecoED;
  deficiente: boolean;
  deficiencia: string;
  deficienciaFamilia: string;
  convenio: boolean;
  observacao: string;
  isAceite: boolean; //substitui assinatura
  exames?: ExameED[] | null;
  indicacao: string;
  isAtivo: boolean;
  dataCadastro?: Date;
  dataAtualizacao?: string
}
