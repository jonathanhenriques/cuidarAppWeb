import { ContatoED } from './../../models/ContatoED';
import { AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { EnderecoED } from 'src/app/models/EnderecoED';
import { ExameED } from 'src/app/models/ExameED';
import { PacienteED } from 'src/app/models/PacienteED';
import { PacienteService } from 'src/app/service/paciente.service';
import { Validacoes } from 'src/app/utils/validacoes';

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.scss'],
})
export class CadastrarPacienteComponent implements OnInit {

  formularioDeUsuario: FormGroup;

  flagIdade: boolean = false;
  desabilitarValidacoes: boolean = false;

  pacientePassado: PacienteED;
  enderecoPassado: EnderecoED;
  contatoPassado: ContatoED;

  constructor(
    private pacienteService: PacienteService,
    private fb: FormBuilder,
    // private toastr: ToastrService,
  ) {}

  ngOnInit(): void {

    this.inicializaObjs();
    this.configurarFormulario(this.pacientePassado, this.enderecoPassado, this.contatoPassado/*, this.examePassado8*/);
    this.desabilitarValidacoesDoFormulario();
    this.desabilitarValidacoes = true;
  }

  private calcularIdade(dataNascimento: any): number {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();

    // Verifica se o aniversário já ocorreu este ano
    if (hoje.getMonth() < nascimento.getMonth() || (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())) {
      return diferencaAnos - 1;
    } else {
      return diferencaAnos;
    }
  }

  private inicializaObjs(){
    this.enderecoPassado = {
      endRua: '',
    endNumero: '',
    endBairro: '',
    endCidade: '',
    endTipoResidencia: '',
    endCep: '',
    endObservacao: ''
  };

    this.contatoPassado = {
      celular: '',
      telefone: '',
      contFacebook: '',
      contInstagram: '',
      email: ''
    };

    this.pacientePassado = {
      nome: '',
      dataNasc: '',
      idade: 1,
      rg: '',
      estadoCivil: '',
      filhos: 0,
      nomeResponsavelPaciente: '',
      contato: this.contatoPassado,
      profissao: '',
      endereco: this.enderecoPassado,
      deficiente: false,
      deficiencia: '',
      deficienciaFamilia: '',
      convenio: false,
      observacao: '',
      isAceite: false, //substitui assinatura
      indicacao: '',
      isAtivo: true,
    }

  }


  private constroiPacienteParaEnvio(){

    this.pacientePassado.nome = this.formularioDeUsuario.value.nome
    this.pacientePassado.dataNasc = this.formularioDeUsuario.value.dataNasc;
    this.pacientePassado.idade = this.calcularIdade(this.pacientePassado.dataNasc)
    this.pacientePassado.rg = this.formularioDeUsuario.value.rg;
    this.pacientePassado.estadoCivil = this.formularioDeUsuario.value.estadoCivil;
    this.pacientePassado.filhos = this.formularioDeUsuario.value.filhos;
    this.pacientePassado.nomeResponsavelPaciente = this.formularioDeUsuario.value.nomeResponsavelPaciente;
    this.pacientePassado.profissao = this.formularioDeUsuario.value.profissao;


    // this.pacientePassado.contato = new ContatoED();
    this.pacientePassado.contato.celular = this.formularioDeUsuario.value.celular;
    this.pacientePassado.contato.telefone = this.formularioDeUsuario.value.telefone;
    this.pacientePassado.contato.contFacebook = this.formularioDeUsuario.value.contFacebook;
    this.pacientePassado.contato.contInstagram = this.formularioDeUsuario.value.contInstagram;
    this.pacientePassado.contato.email = this.formularioDeUsuario.value.email;

    // this.pacientePassado.endereco = this.enderecoPassado;
    this.pacientePassado.endereco.endRua = this.formularioDeUsuario.value.endRua;
    this.pacientePassado.endereco.endNumero = this.formularioDeUsuario.value.endNumero;
    this.pacientePassado.endereco.endBairro = this.formularioDeUsuario.value.endBairro;
    this.pacientePassado.endereco.endCidade = this.formularioDeUsuario.value.endCidade;
    this.pacientePassado.endereco.endTipoResidencia = this.formularioDeUsuario.value.endTipoResidencia;
    this.pacientePassado.endereco.endCep = this.formularioDeUsuario.value.endCep;
    this.pacientePassado.endereco.endObservacao = this.formularioDeUsuario.value.endObservacao;

    this.pacientePassado.deficiente = this.formularioDeUsuario.value.deficiente;
    this.pacientePassado.deficiencia = this.formularioDeUsuario.value.deficiencia;
    this.pacientePassado.deficienciaFamilia = this.formularioDeUsuario.value.deficienciaFamilia;
    this.pacientePassado.convenio = this.formularioDeUsuario.value.convenio;

    this.pacientePassado.observacao = this.formularioDeUsuario.value.observacaoExame;
    this.pacientePassado.indicacao = this.formularioDeUsuario.value.indicacao;
    this.pacientePassado.isAceite = this.formularioDeUsuario.value.isAceite;

    this.pacientePassado.isAtivo = true;

  }

  cadastrarPaciente() {

    this.constroiPacienteParaEnvio()

    const { id,...pacienteRequest } = this.pacientePassado;
    this.pacienteService.postPaciente(pacienteRequest).subscribe((dados: any) => {
      // this.toastr.success('Cadastro realizado!')
      console.log('*****************************')
      console.log('retorno paci:')
      console.log(JSON.stringify(dados,null,2));
      console.log('*****************************')
    },(error) => {
      // this.toastr.error('Cadastro não realizado. Tente novamente.')
    }
    )
  }



private configurarFormulario(paciente: PacienteED, endereco: EnderecoED, contato: ContatoED) {
  this.formularioDeUsuario = this.fb.group({
    nome: [paciente.nome,Validators.compose( [Validators.required, Validators.minLength(3)])],
    dataNasc: [paciente.dataNasc, Validators.required],
    idade: [paciente.idade, Validators.compose([Validators.required])],
    rg: [paciente.rg, Validators.compose([Validators.required, Validacoes.ValidaRg])],
    estadoCivil: [paciente.estadoCivil, Validators.required],
    filhos: [paciente.filhos],
    nomeResponsavelPaciente: [paciente.nomeResponsavelPaciente, Validators.compose([Validators.required])],
    profissao: [paciente.profissao, Validators.required],

    // contatoForm: this.fb.group({
      celular: [contato.celular, Validators.required],
      telefone: [contato.telefone, Validators.compose([Validators.required, Validacoes.comecaComNove])],
      contFacebook: [contato.contFacebook],
      contInstagram: [contato.contInstagram],
      email: [contato.email],
    // },),


    // endereco: this.fb.group({
      endRua: [endereco.endRua],
      endNumero: [endereco.endNumero],
      endBairro: [endereco.endBairro],
      endCidade: [endereco.endCidade],
      endCep: [endereco.endCep],
      endTipoResidencia: [endereco.endTipoResidencia],
      endObservacao: [endereco.endObservacao],
    // }),

    deficiente: [paciente.deficiente],
    deficiencia: [paciente.deficiencia],
    deficienciaFamilia: [paciente.deficienciaFamilia],
    convenio: [paciente.convenio],
    observacaoPaciente: [paciente.observacao],
    isAceite: [paciente.isAceite],
    indicacao: [paciente.indicacao],

  },[
    // {
    //   Validator:Validacoes.comecaComNove
    // },
    // {
    //   validator: Validacoes.maiorDeIdade
    // }
  ]
  );

}

  novo() {
    this.formularioDeUsuario.reset();
  }

  get nome(){
    return this.formularioDeUsuario.get('nome');
  }

  get dataNasc(){
    return this.formularioDeUsuario.get('dataNasc');
  }

  verificaIdade(){
      const idade = this.formularioDeUsuario.get('idade');
      if(idade !== null || idade !== undefined || idade !== '' || idade !== 0){
        this.flagIdade = idade !== null && idade.value >= 18 ? true : false;
      }
  }

  get idade(){
    const idade = this.formularioDeUsuario.get('idade');
    if(idade !== null || idade !== undefined || idade !== '' || idade !== 0){
      this.flagIdade = idade !== null && idade.value >= 18 ? true : false;
    }
    return this.formularioDeUsuario.get('idade');
  }

  get rg(){
    return this.formularioDeUsuario.get('rg');
  }

  get estadoCivil(){
    return this.formularioDeUsuario.get('estadoCivil');
  }

  get filhos(){
    return this.formularioDeUsuario.get('filhos');
  }

  get nomeResponsavelPaciente(){
    return this.formularioDeUsuario.get('nomeResponsavelPaciente');
  }

  get profissao(){
    return this.formularioDeUsuario.get('profissao');
  }

  get celular(){
    return this.formularioDeUsuario.get('celular');
  }

  get telefone(){
    return this.formularioDeUsuario.get('telefone');
  }

  get contFacebook(){
    return this.formularioDeUsuario.get('contFacebook');
  }

  get contInstagram(){
    return this.formularioDeUsuario.get('contInstagram');
  }

  get email(){
    return this.formularioDeUsuario.get('email');
  }

  get rua(){
    return this.formularioDeUsuario.get('rua');
  }

  get numero(){
    return this.formularioDeUsuario.get('numero');
  }

  get bairro(){
    return this.formularioDeUsuario.get('bairro');
  }

  get cidade(){
    return this.formularioDeUsuario.get('cidade');
  }

  get tipoResidencia(){
    return this.formularioDeUsuario.get('tipoResidencia');
  }

  get cep(){
    return this.formularioDeUsuario.get('cep');
  }

  get endObservacao(){
    return this.formularioDeUsuario.get('endObservacao');
  }

  get deficiente(){
    return this.formularioDeUsuario.get('deficiente');
  }

  get deficiencia(){
    return this.formularioDeUsuario.get('deficiencia');
  }

  get deficienciaFamilia(){
    return this.formularioDeUsuario.get('deficienciaFamilia');
  }

  get convenio(){
    return this.formularioDeUsuario.get('convenio');
  }

  get observacao(){
    return this.formularioDeUsuario.get('observacao');
  }

  get aceite(){
    return this.formularioDeUsuario.get('aceite');
  }


  get indicacao(){
    return this.formularioDeUsuario.get('indicacao');
  }

  get isAtivo(){
    return this.formularioDeUsuario.get('isAtivo');
  }

  private desabilitarValidacoesDoFormulario() {
    Object.keys(this.formularioDeUsuario.controls).forEach(key => {
      const control = this.formularioDeUsuario.controls[key];
      control.clearValidators();
      control.updateValueAndValidity();
    });
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita o comportamento padrão de enviar o formulário
    }
  }

}
