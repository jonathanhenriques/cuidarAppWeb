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
import { ActivatedRoute } from '@angular/router';
import { EnderecoED } from 'src/app/models/EnderecoED';
import { ExameED, criaExameComPaciente } from 'src/app/models/ExameED';
import { PacienteED } from 'src/app/models/PacienteED';
import { PacientesService } from 'src/app/service/paciente.service';
import { Validacoes } from 'src/app/utils/validacoes';

@Component({
  selector: 'app-details-paciente',
  templateUrl: './details-paciente.component.html',
  styleUrls: ['./details-paciente.component.scss']
})
export class DetailsPacienteComponent {

  formularioDeUsuarioAtualizar: FormGroup;

  flagIdade: boolean = false;
  desabilitarValidacoes: boolean = false;

  pacientePassado = new PacienteED();
  enderecoPassado = new EnderecoED();
  contatoPassado = new ContatoED();
  examePassado: ExameED | undefined;
  recebePaciente: PacienteED | undefined;

  dataFormatadaExibicao: any
  idPaciente: number

  atributosExame: string[]


  constructor(
    private pacientesService: PacientesService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {

    this.idPaciente = this.activatedRoute.snapshot.params['id'];
    this.buscarPacienteById(this.idPaciente)
    this.desabilitarValidacoesDoFormulario();
    this.desabilitarValidacoes = true;

    this.atributosExame = Object.keys(new ExameED()).map(key => key);
    console.log(typeof this.atributosExame)

  }


  buscarPacienteById(idPaciente: number) {
    this.pacientesService.getPacienteById(this.idPaciente).subscribe((dataPaciente: PacienteED) => {
      this.pacientePassado = dataPaciente;
      console.log('obj paciente buscado')
      console.log(JSON.stringify(this.pacientePassado,null,2))

      this.enderecoPassado = this.pacientePassado.endereco;
      this.contatoPassado = this.pacientePassado.contato;
      this.examePassado = this.pacientePassado?.exames?.[0];

      const dataNasc = new Date(this.pacientePassado.dataNasc);
      const dataNascString = dataNasc?.toISOString()?.split('T')[0];
      this.dataFormatadaExibicao = dataNascString


      this.configurarFormulario(this.pacientePassado, this.enderecoPassado, this.contatoPassado, this.examePassado);

    })

  }

  isDeficiente: boolean = false;

  verificaDeficiente(){
    return this.formularioDeUsuarioAtualizar.get('deficiente')?.value
  }

  enviarDados() {

    this.pacientePassado.nome = this.formularioDeUsuarioAtualizar.value.nome;
    this.pacientePassado.dataNasc = this.formularioDeUsuarioAtualizar.value.dataNasc;
    this.pacientePassado.idade = this.formularioDeUsuarioAtualizar.value.idade;
    this.pacientePassado.rg = this.formularioDeUsuarioAtualizar.value.rg;
    this.pacientePassado.estadoCivil = this.formularioDeUsuarioAtualizar.value.estadoCivil;
    this.pacientePassado.filhos = this.formularioDeUsuarioAtualizar.value.filhos;
    this.pacientePassado.nomeResponsavelPaciente = this.formularioDeUsuarioAtualizar.value.nomeResponsavelPaciente;
    this.pacientePassado.profissao = this.formularioDeUsuarioAtualizar.value.profissao;


    this.pacientePassado.contato = new ContatoED();
    this.pacientePassado.contato.celular = this.formularioDeUsuarioAtualizar.value.celular;
    this.pacientePassado.contato.telefone = this.formularioDeUsuarioAtualizar.value.telefone;
    this.pacientePassado.contato.contFacebook = this.formularioDeUsuarioAtualizar.value.contFacebook;
    this.pacientePassado.contato.contInstagram = this.formularioDeUsuarioAtualizar.value.contInstagram;
    this.pacientePassado.contato.email = this.formularioDeUsuarioAtualizar.value.email;

    this.pacientePassado.endereco = new EnderecoED();
    this.pacientePassado.endereco.endRua = this.formularioDeUsuarioAtualizar.value.endRua;
    this.pacientePassado.endereco.endNumero = this.formularioDeUsuarioAtualizar.value.endNumero;
    this.pacientePassado.endereco.endBairro = this.formularioDeUsuarioAtualizar.value.endBairro;
    this.pacientePassado.endereco.endCidade = this.formularioDeUsuarioAtualizar.value.endCidade;
    this.pacientePassado.endereco.endTipoResidencia = this.formularioDeUsuarioAtualizar.value.endTipoResidencia;
    this.pacientePassado.endereco.endCep = this.formularioDeUsuarioAtualizar.value.endCep;
    this.pacientePassado.endereco.endObservacao = this.formularioDeUsuarioAtualizar.value.endObservacao;
    // this.pacientePassado.endereco = enderecoCompleto;

    this.pacientePassado.deficiente = this.formularioDeUsuarioAtualizar.value.deficiente === true || this.formularioDeUsuarioAtualizar.value.deficiente === 'true' || this.formularioDeUsuarioAtualizar.value.deficiente === true ? 1 : 0;
    this.pacientePassado.deficiencia = this.formularioDeUsuarioAtualizar.value.deficiencia;
    this.pacientePassado.deficienciaFamilia = this.formularioDeUsuarioAtualizar.value.deficienciaFamilia;
    this.pacientePassado.convenio = this.formularioDeUsuarioAtualizar.value.convenio === true ? 1 : 0;
    // this.pacientePassado.atendente = []
    // this.pacientePassado.atendente = [this.formularioDeUsuario.value.atendente];

    let exameCompleto = new ExameED();
    let n = +this.pacientePassado?.exames?.[0].id!
    exameCompleto.id = n;
    exameCompleto.paciente = new PacienteED()
    exameCompleto.paciente.id = this.idPaciente;
    exameCompleto.nomeExame = this.formularioDeUsuarioAtualizar.value.exame;
    exameCompleto.medico = this.formularioDeUsuarioAtualizar.value.medicoAtendente;
    exameCompleto.local = this.formularioDeUsuarioAtualizar.value.local;
    exameCompleto.paciente = null;
    exameCompleto.dataExame = new Date();
    exameCompleto.valor = this.formularioDeUsuarioAtualizar.value.valorExame;
    exameCompleto.atendente = this.formularioDeUsuarioAtualizar.value.atendente;
    exameCompleto.observacao = this.formularioDeUsuarioAtualizar.value.observacaoExame;
    this.pacientePassado.exames = [exameCompleto];
    // this.pacientePassado.local = [this.formularioDeUsuario.value.local];
    // this.pacientePassado.medicoAtendente = [this.formularioDeUsuario.value.medicoAtendente];


    this.pacientePassado.observacao = this.formularioDeUsuarioAtualizar.value.observacaoExame;
    this.pacientePassado.indicacao = this.formularioDeUsuarioAtualizar.value.indicacao;
    // this.pacientePassado.aceite = this.formularioDeUsuario.value.aceite;
    this.pacientePassado.aceite = true

    this.pacientePassado.isAtivo = 1;
    this.pacientePassado.dataCadastro = new Date();




    // console.log(JSON.stringify(this.pacientePassado,null,2))

    // console.log('obj formulario')
    // console.log(JSON.stringify(this.formularioDeUsuario.value,null,2))
    // console.warn('---------------------------------')

    console.log('obj paciente para atalizar')
    console.log(JSON.stringify(this.pacientePassado,null,2))
    console.warn('---------------------------------')

    // console.log('obj contato')
    // console.log(JSON.stringify(this.contatoPassado,null,2))
    // console.warn('---------------------------------')
    // console.log('obj exame')
    // console.log(JSON.stringify(this.examePassado,null,2))
    // console.warn('---------------------------------')
    // console.log('obj endereco')
    // console.log(JSON.stringify(this.enderecoPassado,null,2))


    this.pacientesService.putPaciente(this.pacientePassado).subscribe((dados: any) => {
      console.log('obj paciente atualizado')
      console.log(JSON.stringify(dados,null,2));
    })
  }


  configurarFormulario(paciente: PacienteED, endereco: EnderecoED, contato: ContatoED, exame: ExameED | undefined) {
    this.formularioDeUsuarioAtualizar = this.fb.group({
      nome: [paciente.nome,Validators.compose( [Validators.required, Validators.minLength(3)])],
      dataNasc: [this.dataFormatadaExibicao, Validators.required],
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
      aceite: [paciente.aceite],
      atendente: [exame?.atendente],
      medicoAtendente: [exame?.medico, Validators.required],
      exame: [exame?.nomeExame, Validators.required],
      observacaoExame: [exame?.observacao],
      valorExame: [exame?.valor, Validators.required],
      local: [exame?.local, Validators.required],
      indicacao: [paciente.indicacao],

      // isAtivo: [paciente.isAtivo],
      // dataCadastro: [paciente.dataCadastro],
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


  // novo() {
  //   this.formularioDeUsuario.reset();
  // }

  get nome(){
    return this.formularioDeUsuarioAtualizar.get('nome');
  }

  get dataNasc(){
    return this.formularioDeUsuarioAtualizar.get('dataNasc');
  }

  verificaIdade(){
      const idade = this.formularioDeUsuarioAtualizar.get('idade');
      if(idade !== null || idade !== undefined || idade !== '' || idade !== 0){
        this.flagIdade = idade !== null && idade.value >= 18 ? true : false;
      }
  }

  get idade(){
    const idade = this.formularioDeUsuarioAtualizar.get('idade');
    if(idade !== null || idade !== undefined || idade !== '' || idade !== 0){
      this.flagIdade = idade !== null && idade.value >= 18 ? true : false;
    }
    return this.formularioDeUsuarioAtualizar.get('idade');
  }

  get rg(){
    return this.formularioDeUsuarioAtualizar.get('rg');
  }

  get estadoCivil(){
    return this.formularioDeUsuarioAtualizar.get('estadoCivil');
  }

  get filhos(){
    return this.formularioDeUsuarioAtualizar.get('filhos');
  }

  get nomeResponsavelPaciente(){
    return this.formularioDeUsuarioAtualizar.get('nomeResponsavelPaciente');
  }

  get profissao(){
    return this.formularioDeUsuarioAtualizar.get('profissao');
  }

  get celular(){
    return this.formularioDeUsuarioAtualizar.get('celular');
  }

  get telefone(){
    return this.formularioDeUsuarioAtualizar.get('telefone');
  }

  get contFacebook(){
    return this.formularioDeUsuarioAtualizar.get('contFacebook');
  }

  get contInstagram(){
    return this.formularioDeUsuarioAtualizar.get('contInstagram');
  }

  get email(){
    return this.formularioDeUsuarioAtualizar.get('email');
  }

  get rua(){
    return this.formularioDeUsuarioAtualizar.get('rua');
  }

  get numero(){
    return this.formularioDeUsuarioAtualizar.get('numero');
  }

  get bairro(){
    return this.formularioDeUsuarioAtualizar.get('bairro');
  }

  get cidade(){
    return this.formularioDeUsuarioAtualizar.get('cidade');
  }

  get tipoResidencia(){
    return this.formularioDeUsuarioAtualizar.get('tipoResidencia');
  }

  get cep(){
    return this.formularioDeUsuarioAtualizar.get('cep');
  }

  get endObservacao(){
    return this.formularioDeUsuarioAtualizar.get('endObservacao');
  }

  get deficiente(){
    return this.formularioDeUsuarioAtualizar.get('deficiente');
  }

  get deficiencia(){
    return this.formularioDeUsuarioAtualizar.get('deficiencia');
  }

  get deficienciaFamilia(){
    return this.formularioDeUsuarioAtualizar.get('deficienciaFamilia');
  }

  get convenio(){
    return this.formularioDeUsuarioAtualizar.get('convenio');
  }

  get observacao(){
    return this.formularioDeUsuarioAtualizar.get('observacao');
  }

  get aceite(){
    return this.formularioDeUsuarioAtualizar.get('aceite');
  }

  get atendente(){
    return this.formularioDeUsuarioAtualizar.get('atendente');
  }

  get medicoAtendente(){
    return this.formularioDeUsuarioAtualizar.get('medicoAtendente');
  }

  get exame(){
    return this.formularioDeUsuarioAtualizar.get('exame');
  }

  get local(){
    return this.formularioDeUsuarioAtualizar.get('local');
  }

  get indicacao(){
    return this.formularioDeUsuarioAtualizar.get('indicacao');
  }

  get isAtivo(){
    return this.formularioDeUsuarioAtualizar.get('isAtivo');
  }

  get dataCadastro(){
    return this.formularioDeUsuarioAtualizar.get('dataCadastro');
  }


  desabilitarValidacoesDoFormulario() {
    // Object.keys(this.formularioDeUsuario?.controls).forEach(key => {
    //   const control = this.formularioDeUsuario?.controls?.[key];
    //   control.clearValidators();
    //   control.updateValueAndValidity();
    // });
  }





}



