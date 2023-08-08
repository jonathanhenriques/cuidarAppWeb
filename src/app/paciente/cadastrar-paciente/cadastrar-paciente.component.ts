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
  ) {}

  ngOnInit(): void {


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
      aceite: false, //substitui assinatura
      indicacao: '',
      isAtivo: true,
    }


    this.configurarFormulario(this.pacientePassado, this.enderecoPassado, this.contatoPassado/*, this.examePassado8*/);
    this.desabilitarValidacoesDoFormulario();
    this.desabilitarValidacoes = true;
  }



  enviarDados() {

    // let jso = {
    //   "nome": "Jonathan",
    //   "dataNasc": "1997-05-05",
    //   "idade": "25",
    //   "rg": "501818352",
    //   "estadoCivil": "SOLTEIRO",
    //   "filhos": 0,
    //   "nomeResponsavelPaciente": "",
    //   "profissao": "Desenvolvedor",
    //   "contatoForm": {
    //     "celular": "11959503571",
    //     "telefone": "1140551452",
    //     "contFacebook": "faceboks",
    //     "contInstagram": "instagram",
    //     "email": "email@email.com"
    //   },
    //   "enderecoForm": {
    //     "rua": "ruas",
    //     "numero": "1",
    //     "bairro": "bairros",
    //     "cidade": "Cidades",
    //     "tipoResidencia": "Casa",
    //     "cep": "09951490",
    //     "endObservacao": "Obersevado"
    //   },
    //   "deficiente": false,
    //   "deficiencia": "",
    //   "deficienciaFamilia": "",
    //   "convenio": false,
    //   "observacao": "",
    //   "aceite": true,
    //   "atendente": [
    //     "andreia"
    //   ],
    //   "medicoAtendente": [
    //     "Japones"
    //   ],
    //   "exame": "vista",
    //   "local": [
    //     "Diadema"
    //   ],
    //   "indicacao": "",
    //   "isAtivo": false,
    //   "dataCadastro": "2023-04-23T18:43:29.369Z",
    //   "exames": [{
    //     "id": 0,
    //     "medico": "J",
    //     "local": "D",
    //     "paciente": null,
    //     "dataExame": "2023-04-23T19:16:54.830Z",
    //     "valor": 0,
    //     "observacao": ""
    //   }]
    // }


    // this.pacientePassado.nome = this.formularioDeUsuario.value.nome;
    this.pacientePassado.nome = this.formularioDeUsuario.value.nome
    this.pacientePassado.dataNasc = this.formularioDeUsuario.value.dataNasc;
    // this.pacientePassado.dataNasc = "1990-01-01";
    // this.pacientePassado.idade = this.formularioDeUsuario.value.idade;
    this.pacientePassado.idade = this.formularioDeUsuario.value.idade;
    this.pacientePassado.rg = this.formularioDeUsuario.value.rg;
    this.pacientePassado.estadoCivil = this.formularioDeUsuario.value.estadoCivil;
    // this.pacientePassado.estadoCivil = 'SOLTEIRO';
    this.pacientePassado.filhos = this.formularioDeUsuario.value.filhos;
    this.pacientePassado.nomeResponsavelPaciente = this.formularioDeUsuario.value.nomeResponsavelPaciente;
    this.pacientePassado.profissao = this.formularioDeUsuario.value.profissao;


    // this.pacientePassado.contato = new ContatoED();
    this.pacientePassado.contato.celular = this.formularioDeUsuario.value.celular;
    this.pacientePassado.contato.telefone = this.formularioDeUsuario.value.telefone;
    this.pacientePassado.contato.contFacebook = this.formularioDeUsuario.value.contFacebook;
    this.pacientePassado.contato.contInstagram = this.formularioDeUsuario.value.contInstagram;
    this.pacientePassado.contato.email = this.formularioDeUsuario.value.email;

    this.pacientePassado.endereco = this.enderecoPassado;
    //  {
    //   endRua: '',
    //   endNumero: '',
    //   endBairro: '',
    //   endCidade: '',
    //   endTipoResidencia: '',
    //   endCep: '',
    //   endObservacao: ''
    // };
    this.pacientePassado.endereco.endRua = this.formularioDeUsuario.value.endRua;
    this.pacientePassado.endereco.endNumero = this.formularioDeUsuario.value.endNumero;
    this.pacientePassado.endereco.endBairro = this.formularioDeUsuario.value.endBairro;
    this.pacientePassado.endereco.endCidade = this.formularioDeUsuario.value.endCidade;
    this.pacientePassado.endereco.endTipoResidencia = this.formularioDeUsuario.value.endTipoResidencia;
    this.pacientePassado.endereco.endCep = this.formularioDeUsuario.value.endCep;
    this.pacientePassado.endereco.endObservacao = this.formularioDeUsuario.value.endObservacao;
    // this.pacientePassado.endereco = enderecoCompleto;

    // this.pacientePassado.deficiente = this.formularioDeUsuario.value.deficiente === true || this.formularioDeUsuario.value.deficiente === 'true' || this.formularioDeUsuario.value.deficiente === true ? 1 : 0;
    this.pacientePassado.deficiente = this.formularioDeUsuario.value.deficiente;
    this.pacientePassado.deficiencia = this.formularioDeUsuario.value.deficiencia;
    this.pacientePassado.deficienciaFamilia = this.formularioDeUsuario.value.deficienciaFamilia;
    // this.pacientePassado.convenio = this.formularioDeUsuario.value.convenio === true ? 1 : 0;
    this.pacientePassado.convenio = this.formularioDeUsuario.value.convenio;
    // this.pacientePassado.atendente = [this.formularioDeUsuario.value.atendente];

    this.pacientePassado.observacao = this.formularioDeUsuario.value.observacaoExame;
    this.pacientePassado.indicacao = this.formularioDeUsuario.value.indicacao;
    // this.pacientePassado.aceite = this.formularioDeUsuario.value.aceite;
    this.pacientePassado.aceite = true

    this.pacientePassado.isAtivo = true;
    // this.pacientePassado.dataCadastro = new Date();




    // console.log(JSON.stringify(this.pacientePassado,null,2))
    console.log('obj formulario')
    console.log(JSON.stringify(this.formularioDeUsuario.value,null,2))
    console.warn('---------------------------------')
    console.log('obj paciente')
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

    // delete this.pacientePassado.id
    const { id,endereco,...pacienteRequest } = this.pacientePassado;
    // let ob = {
    //   nome: "Nome do Paciente",
    //   dataNasc: "1990-01-01",
    //   idade: 32,
    //   rg: "123456789",
    //   estadoCivil: "VIUVO",
    //   filhos: 2,
    //   nomeResponsavelPaciente: "Responsável do Paciente",
    //   contato: {
    //     celular: "1234567890",
    //     telefone: "9876543210",
    //     contFacebook: "facebook.com/paciente",
    //     contInstagram: "instagram.com/paciente",
    //     email: "paciente@example.com"
    //   },
    //   profissao: "Profissão do Paciente",
    //   endereco: {
    //     endRua: "Rua do Paciente",
    //     endNumero: "123",
    //     endBairro: "Bairro do Paciente",
    //     endCidade: "Cidade do Paciente",
    //     endCep: "12345-678",
    //     endTipoResidencia: "CASA",
    //     endObservacao: "Observação do Endereço"
    //   },
    //   deficiente: false,
    //   deficiencia: "Tipo de Deficiência",
    //   deficienciaFamilia: "Deficiência na Família",
    //   convenio: true,
    //   observacao: "Observação do Paciente",
    //   aceite: true,
    //   indicacao: "Indicação do Paciente",
    //   isAtivo: true
    // }

    this.pacienteService.cadastrarPaciente(pacienteRequest).subscribe((dados: any) => {
      console.log('*****************************')
      console.log('retorno paci:')
      console.log(JSON.stringify(dados,null,2));
      console.log('*****************************')
    })

    // const usuario = new Usuario(
    //   dadosFormulario.nome,
    //   dadosFormulario.email,
    //   dadosFormulario.cpf,
    //   dadosFormulario.nascimento,
    //   dadosFormulario.senha
    // );
  }



configurarFormulario(paciente: PacienteED, endereco: EnderecoED, contato: ContatoED/*, exame: ExameED*/) {
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
    aceite: [paciente.aceite],
    indicacao: [paciente.indicacao],

    // atendente: [exame.atendente],
    // medicoAtendente: [exame.medico, Validators.required],
    // exame: [exame.nomeExame, Validators.required],
    // observacaoExame: [exame.observacao],
    // valorExame: [exame.valor, Validators.required],
    // local: [exame.local, Validators.required],

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

  // get dataCadastro(){
  //   return this.formularioDeUsuario.get('dataCadastro');
  // }
  // get atendente(){
  //   return this.formularioDeUsuario.get('atendente');
  // }

  // get medicoAtendente(){
  //   return this.formularioDeUsuario.get('medicoAtendente');
  // }

  // get exame(){
  //   return this.formularioDeUsuario.get('exame');
  // }

  // get local(){
  //   return this.formularioDeUsuario.get('local');
  // }



  desabilitarValidacoesDoFormulario() {
    Object.keys(this.formularioDeUsuario.controls).forEach(key => {
      const control = this.formularioDeUsuario.controls[key];
      control.clearValidators();
      control.updateValueAndValidity();
    });
  }





}
