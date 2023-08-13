import { ExameService } from './../../service/exame.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AtendenteED } from 'src/app/models/AtendenteED';
import { ContatoED } from 'src/app/models/ContatoED';
import { EnderecoED } from 'src/app/models/EnderecoED';
import { ExameED } from 'src/app/models/ExameED';
import { LocalED } from 'src/app/models/LocalED';
import { MedicoED } from 'src/app/models/MedicoED';
import { PacienteED } from 'src/app/models/PacienteED';
import { AtendenteService } from 'src/app/service/atendente.service';
import { LocalService } from 'src/app/service/local.service';
import { MedicoService } from 'src/app/service/medico.service';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-details-exame',
  templateUrl: './details-exame.component.html',
  styleUrls: ['./details-exame.component.scss']
})
export class DetailsExameComponent implements OnInit {

  idExame: any;

  formularioDeExame: FormGroup;

  listaMedicos: MedicoED[] = [];
  listaLocais: LocalED[] = [];
  listaAtendentes: AtendenteED[] = []

  codigoExame: string;
  medicoSelecionado: number[] = [];
  localSelecionado: number;
  atendenteSelecionado: number;
  pacienteSelecionado: number;

  examePassado =   {
    nomeExame: '',
    medico: {
      nome: '',
      isAtivo: true
     },
    local: {
      nomeLocal: '',
      endereco: {
        endRua: '',
        endNumero: '',
        endBairro: '',
        endCidade: '',
        endTipoResidencia: '',
        endCep: '',
        endObservacao: '',
      }
    },
    dataExame: '',
    valor: 0,
    atendente: {
      nome: '',
      isAtivo: true
    }
    ,
    observacao: '',
    isAtivo: true
  }

  constructor(
    private ExameService: ExameService,
    private fb: FormBuilder,
    private activatedRoute :ActivatedRoute,
    private exameService:ExameService ,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private localService: LocalService,
    private atendenteService: AtendenteService
    ) {}

    ngOnInit(): void {

    let codigo: string = this.activatedRoute.snapshot.params['codigo'];
    this.getByCodigoExame(codigo)
    this.getAllMedicos();
    this.getAllLocais();
    this.getAllAtendentes();
    this.desabilitarValidacoesDoFormulario

    // this.configurarFormulario
    this.constroiExameParaEnvio
  }


  private configurarFormulario(exame: ExameED) {
    this.formularioDeExame = this.fb.group({

      atendente: [exame.atendente.nome],
      medicoAtendente: [exame.medico?.nome, Validators.required],
      exame: [exame.nomeExame, Validators.required],
      observacaoExame: [exame?.observacao],
      valorExame: [exame?.valor, Validators.required],
      local: [exame.local.nomeLocal, Validators.required],

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



  private constroiExameParaEnvio(){

    this.examePassado.nomeExame = this.formularioDeExame.value.exame;
    this.examePassado.medico = this.formularioDeExame.value.medicoAtendente;
    this.examePassado.atendente = this.formularioDeExame.value.atendente;
    this.examePassado.local = this.formularioDeExame.value.local;
    // this.examePassado.paciente = null;
    this.examePassado.dataExame = '';
    this.examePassado.valor = this.formularioDeExame.value.valorExame;
    this.examePassado.observacao = this.formularioDeExame.value.observacaoExame;

    // const { dataAtualizacao,dataCadastro, exames, ...pacienteRequest } = this.pacientePassado;
    // this.pacientePassado = { ...pacienteRequest };

    // this.pacientePassado = pacienteRequest;
  }


  atualizarExame(){
    this.ExameService.putExame(this.examePassado).subscribe((exameData: ExameED) => {
      this.examePassado = exameData;
    },(error) => console.error('deu errado'));
  }


  private getByCodigoExame(codigo: string){
    console.log('codigo: ' + codigo)
    this.ExameService.findByCodigoExame(codigo).subscribe((data: ExameED) => {
      this.idExame = data?.id;
      console.log('voltou pro metodo')
      console.log('data metodo: ')
      console.table(data)
    this.examePassado = data;
    this.configurarFormulario(this.examePassado);
    },(error) => console.error('deu errado'));
  }

  getAllMedicos(){
    this.medicoService.getAllMedicos().then((resposta: any) => {
      this.listaMedicos = resposta.medicos
      console.table(resposta)
    })
  }

  getAllLocais(){
    this.localService.getAllLocais()
    .then((resposta: any) => {
      this.listaLocais = resposta.locais
      console.log('Locais: ')
      console.table(resposta)
    },
    error => {
      console.log('Erro ao obter Locais:', error);
    })
  }

  getAllAtendentes(){
    this.atendenteService.getAllAtendentes()
    .then((resposta: any) => {
      this.listaAtendentes = resposta.atendentes
      console.log('Atendentes: ')
      console.table(resposta)
    },
    error => {
      console.log('Erro ao obter Atendentes:', error);
    })
  }


  novo() {
    this.formularioDeExame.reset();
  }



  private desabilitarValidacoesDoFormulario() {
    Object.keys(this.formularioDeExame.controls).forEach(key => {
      const control = this.formularioDeExame.controls[key];
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
