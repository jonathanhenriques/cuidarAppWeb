import { ExameService } from './../../service/exame.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
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

  @ViewChild('nomeExame') nomeExameInput: ElementRef;
  @ViewChild('valorExame') valorExameInput: ElementRef;
  @ViewChild('observacaoExame') observacaoExameInput: ElementRef;

  idExame: any;

  formularioDeExame: FormGroup;

  listaMedicos: MedicoED[] = [];
  listaLocais: LocalED[] = [];
  listaAtendentes: AtendenteED[] = []

  codigoExame: string;
  medicoExame: string;
  localExame: string;
  atendenteExame: string;
  pacienteExame: any;

  examePassado =   {
    nomeExame: '',
    medico: {} as MedicoED,
    local: {} as LocalED,
    dataExame: '',
    valor: 0,
    atendente: {} as AtendenteED
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
    // this.getAllMedicos();
    // this.getAllLocais();
    // this.getAllAtendentes();
    this.desabilitarValidacoesDoFormulario

    // this.configurarFormulario
    // this.constroiExameParaEnvio
  }


  private configurarFormulario(exame: ExameED) {
    this.getAllMedicos();
    this.getAllLocais();
    this.getAllAtendentes();
    this.formularioDeExame = this.fb.group({

      atendenteExame: [this.atendenteExame],
      paciente: [this.pacienteExame],
      medicoExame: [this.medicoExame],
      exame: [exame.nomeExame],
      observacaoExame: [exame?.observacao],
      valorExame: [exame?.valor],
      localExame: [this.localExame]

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
      this.localExame = data?.local.nomeLocal;
      this.atendenteExame = data?.atendente.nome;
      this.medicoExame = data?.medico.nome;
      this.pacienteExame = data?.paciente?.nome;
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

  gerarPDF() {
    let documento = new jsPDF('p', 'mm', 'a4');
    documento.setFont("Courier");
    // documento.setFontStyle("bold");
    documento.setFontSize(20);
    documento.text("Ficha do Exame", 65, 15);

    documento.setFillColor(50,50,50);
    documento.rect(10, 20, 30, 8, "FD");
    documento.rect(10, 28, 30, 8, "FD");
    documento.rect(10, 36, 30, 8, "FD");
    documento.rect(10, 36, 30, 8, "FD");
    // documento.rect(40, 20, 160, 8, "s");
    // documento.rect(40, 28, 160, 8, "s");
    // documento.rect(40, 36, 160, 8, "s");

    documento.setFontSize(12);
    documento.setTextColor(255, 255, 255);
    documento.text("Código", 12, 25);
    documento.text("Exame", 12, 33);
    documento.text("Paciente", 12, 41);
    documento.setTextColor(0, 0, 0);
    documento.text("Local", 12, 49);
    documento.text("Atendente", 12, 57);
    documento.text("Médico", 12, 65);
    documento.text("Valor: R$:", 12, 73);
    documento.text("Observação:", 12, 81);

    // documento.setFontStyle("normal");
    documento.setTextColor(0, 0, 0);
    documento.text("001", 42, 25);
    documento.text(this.nomeExameInput.nativeElement.value.toString(), 42, 33);
    documento.text(this.pacienteExame.toString(), 42, 41);
    documento.setTextColor(0, 0, 0);
    documento.text(this.localExame.toString(), 42, 49);
    documento.text(this.atendenteExame.toString(), 42, 57);
    documento.text(this.medicoExame.toString(), 42, 65);
    documento.text(this.valorExameInput.nativeElement.value.toString(), 42, 73);
    documento.text(this.observacaoExameInput.nativeElement.value.toString(), 42, 81);

    documento.output("dataurlnewwindow");
  }



}
