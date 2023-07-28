import { ContatoED } from "./ContatoED";
import { EnderecoED } from "./EnderecoED";
import { ExameED } from "./ExameED";

export class PacienteED {
  public id: number;
  public nome: string;
  public dataNasc: Date;
  public idade: number;
  public rg: string;
  public estadoCivil: string;
  public filhos: number;
  public nomeResponsavelPaciente: string;
  public contato: ContatoED;
  public profissao: string;
  public endereco: EnderecoED;
  public deficiente: number;
  public deficiencia: string;
  public deficienciaFamilia: string;
  public convenio: number;
  public observacao: string;
  public aceite: boolean; //substitui assinatura
  // public atendente: string[];
  // public medicoAtendente: string[];
  public exames: ExameED[] | null;
  // public local: string[];
  public indicacao: string;
  public isAtivo: 1;
  public dataCadastro: Date;

  constructor() {
    this.id =  0;
    this.nome = '';
    this.dataNasc = new Date();
    this.idade = 0;
    this.rg = '';
    this.estadoCivil = '';
    this.filhos = 0;
    this.nomeResponsavelPaciente = '';
    this.contato = new ContatoED();
    this.profissao = '';
    this.endereco = new EnderecoED();
    this.deficiente = 0;
    this.deficiencia = '';
    this.deficienciaFamilia = '';
    this.convenio = 0;
    this.observacao = '';
    this.aceite = true; //substitui assinatura
    // this.atendente = [];
    // this.medicoAtendente = [];
    this.exames = [];
    // this.local = [];
    this.indicacao = '';
    this.isAtivo = 1;
    this.dataCadastro = new Date();
  }
}
