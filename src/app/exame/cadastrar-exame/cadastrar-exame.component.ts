import { PacienteED } from './../../models/PacienteED';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendenteED } from 'src/app/models/AtendenteED';
import { ExameED } from 'src/app/models/ExameED';
import { LocalED } from 'src/app/models/LocalED';
import { MedicoED } from 'src/app/models/MedicoED';
import { AtendenteService } from 'src/app/service/atendente.service';
import { ExameService } from 'src/app/service/exame.service';
import { LocalService } from 'src/app/service/local.service';
import { MedicoService } from 'src/app/service/medico.service';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-cadastrar-exame',
  templateUrl: './cadastrar-exame.component.html',
  styleUrls: ['./cadastrar-exame.component.scss'],
})
export class CadastrarExameComponent implements OnInit {

  formularioDeExame: FormGroup;

  listaMedicos: MedicoED[] = [];
  listaLocais: LocalED[] = [];
  listaAtendentes: AtendenteED[] = [];

  codigoExame: string;
  medicoSelecionado: number[] = [];
  localSelecionado: number;
  atendenteSelecionado: number;
  pacienteSelecionado: number;

  idPaciente: number | undefined;
  pacientePassado: PacienteED;

  examePassado = {
    nomeExame: '',
    medico: {} as MedicoED,
    local: {} as LocalED,
    paciente: {} as PacienteED,
    dataExame: '',
    valor: 0,
    atendente: {} as AtendenteED,
    observacao: '',
    isAtivo: true
  };

  constructor(
    private fb: FormBuilder,
    private exameService: ExameService,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private localService: LocalService,
    private atendenteService: AtendenteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    // this.listaMedicos.push({ nome: '', isAtivo: true });
    // this.listaLocais.push(this.examePassado.local);
    // this.listaAtendentes.push({ nome: '', isAtivo: true });
  }

  ngOnInit(): void {
    let codigo: string = this.activatedRoute.snapshot.params['codigo'];
    this.getByCodigoPaciente(codigo)
    // this.getAllMedicos();
    // this.getAllLocais();
    // this.getAllAtendentes();
    this.desabilitarValidacoesDoFormulario;

    // this.configurarFormulario(this.examePassado, this.pacientePassado);
    // this.constroiExameParaEnvio;
  }

  private configurarFormulario(exame: ExameED, paciente: PacienteED) {

    this.getAllMedicos();
    this.getAllLocais();
    this.getAllAtendentes();

    this.formularioDeExame = this.fb.group(
      {
        pacienteNome: [paciente.nome],
        atendente: [exame.atendente.nome],
        medicoAtendente: [exame.medico?.nome, Validators.required],
        exame: [exame.nomeExame, Validators.required],
        observacaoExame: [exame?.observacao],
        valorExame: [exame?.valor, Validators.required],
        local: [exame.local.nomeLocal, Validators.required],
      },
      [
        // {
        //   Validator:Validacoes.comecaComNove
        // },
        // {
        //   validator: Validacoes.maiorDeIdade
        // }
      ]
    );
  }

  private constroiExameParaEnvio() {
    this.examePassado.nomeExame = this.formularioDeExame.value.exame;
    this.examePassado.medico.id = this.formularioDeExame.value.medicoAtendente;
    this.examePassado.atendente.id = this.formularioDeExame.value.atendente;
    this.examePassado.local.id = this.formularioDeExame.value.local;
    this.examePassado.paciente.codigo = this.pacientePassado.codigo;
    // this.examePassado.dataExame = '';
    this.examePassado.valor = this.formularioDeExame.value.valorExame;
    this.examePassado.observacao = this.formularioDeExame.value.observacaoExame;

    // const { dataAtualizacao,dataCadastro, exames, ...pacienteRequest } = this.pacientePassado;
    // this.pacientePassado = { ...pacienteRequest };

    // this.pacientePassado = pacienteRequest;
  }

  cadastrarExame() {
    this.constroiExameParaEnvio();
    this.exameService.postExame(this.examePassado).subscribe(
      (exameData: any) => {
        // this.examePassado = exameData;
        console.log('Cadastrado com sucesso!')
        this.redirectToOtherPage();
      },
      (error) => console.error('deu errado')
    );
  }

  // private getByCodigoExame(codigo: string){
  //   console.log('codigo: ' + codigo)
  //   this.exameService.findByCodigoExame(codigo).subscribe((data: ExameED) => {
  //     this.idExame = data?.id;
  //     console.log('voltou pro metodo')
  //     console.log('data metodo: ')
  //     console.table(data)
  //   this.examePassado = data;
  //   this.configurarFormulario(this.examePassado);
  //   },(error) => console.error('deu errado'));
  // }

  private getByCodigoPaciente(codigo: string){
    console.log('codigo: ' + codigo)
    this.pacienteService.findByCodigoPaciente(codigo).subscribe((data: PacienteED) => {
      this.idPaciente = data?.id;
    this.pacientePassado = data;
    console.log('paciente metodo')
    console.table(this.pacientePassado)



    this.configurarFormulario(this.examePassado,this.pacientePassado);
    },(error) => console.error('deu errado'));
  }

  getAllMedicos() {
    this.medicoService.getAllMedicos().then((resposta: any) => {
      this.listaMedicos = resposta.medicos;
      console.table(resposta);
    });
  }

  getAllLocais() {
    this.localService.getAllLocais().then(
      (resposta: any) => {
        this.listaLocais = resposta.locais;
        // console.log('Locais: ');
        // console.table(resposta.locais);
      },
      (error) => {
        console.log('Erro ao obter Locais:', error);
      }
    );
  }

  getAllAtendentes() {
    this.atendenteService.getAllAtendentes().then(
      (resposta: any) => {
        this.listaAtendentes = resposta.atendentes;
        console.log('Atendentes: ');
        console.table(resposta);
      },
      (error) => {
        console.log('Erro ao obter Atendentes:', error);
      }
    );
  }

  novo() {
    this.formularioDeExame.reset();
  }

  private desabilitarValidacoesDoFormulario() {
    Object.keys(this.formularioDeExame.controls).forEach((key) => {
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


  redirectToOtherPage() {
    // Navega para a outra página definida na rota
    this.router.navigate(['/exames/listar']);
  }


}
