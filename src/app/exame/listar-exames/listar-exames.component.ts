import { ExameED } from 'src/app/models/ExameED';
import { ExameService } from './../../service/exame.service';
import { Component, OnInit } from '@angular/core';
import { ExameFiltro } from 'src/app/models/filtros/ExameFiltro';

import { MedicoService } from 'src/app/service/medico.service';
import { PacienteService } from 'src/app/service/paciente.service';
import { MedicoED } from 'src/app/models/MedicoED';
import { ParametroExameRequest } from 'src/app/models/filtros/ParametroExameRequest';
import { LocalED } from 'src/app/models/LocalED';
import { LocalService } from 'src/app/service/local.service';
import { PacienteED } from 'src/app/models/PacienteED';
import { AtendenteED } from 'src/app/models/AtendenteED';
import { AtendenteService } from 'src/app/service/atendente.service';

@Component({
  selector: 'app-listar-exames',
  templateUrl: './listar-exames.component.html',
  styleUrls: ['./listar-exames.component.scss']
})
export class ListarExamesComponent implements OnInit {

  private exame: ExameED = new ExameED();
  exames: ExameED[] = [];
  private filtro = new ExameFiltro();
  listaPacientes: PacienteED[] = []
  listaMedicos: MedicoED[] = [];
  listaLocais: LocalED[] = [];
  listaAtendentes: AtendenteED[] = []

  codigoExame: string;
  medicoSelecionado: number[] = [];
  localSelecionado: number;
  atendenteSelecionado: number;
  pacienteSelecionado: number;
  nomeExameSelecionado: string;
  dataExameSelecionado: Date;
  valorSelecionado: number;
  situacaoExameSelecionado: boolean; //isAtivo
  pacienteRG: string
  pacienteId: number | undefined
  // private medicoSelecaoEnvio: number;
  currentPage: number = 0;
  totalItems = 0;
  itemsPerPage = 5;

  pacienteRetornado: PacienteED

  private nomeExame: string;

  constructor(
    private exameService:ExameService ,
    private pacienteService: PacienteService,
    private medicoService: MedicoService,
    private localService: LocalService,
    private atendenteService: AtendenteService
    ){}

  ngOnInit(): void {

    this.getAllMedicos();
    this.getAllLocais();
    this.getAllAtendentes();
    this.listarExames(this.currentPage);
  }



  listarExames(pagina: number): void {
    const listaParametros: ParametroExameRequest = {
      codigo: this.codigoExame,
      medicoId: this.medicoSelecionado[0],
      localId: this.localSelecionado,
      pacienteId: this.pacienteId,
      pacienteRG: this.pacienteRG,
      atendenteId: this.atendenteSelecionado,
      dataExame: this.dataExameSelecionado,
      nomeExame: this.nomeExameSelecionado,
      valor: this.valorSelecionado,
      isAtivo: this.situacaoExameSelecionado,
    };

    this.filtro.pagina = pagina;

    this.exameService
      .getAllWithParameters(listaParametros, this.filtro)
      .then((dataExames: any) => {
        this.exames = dataExames.exames;
        this.totalItems = dataExames.total;
        console.table(this.exames);
        // console.warn(this.medicoSelecionado);
      },
      error => {
        console.log('Erro ao obter exames:', error);
      });
  }


  pageChanged(event: any): void {
    // this.currentPage =  event!.first! / event!.rows!;
    console.log(`pag: ${this.currentPage-1}`)
    this.listarExames(this.currentPage-1);
  }

  getAllMedicos(){
    this.medicoService.getAllMedicos().subscribe((resposta: MedicoED[]) => {
      this.listaMedicos = resposta
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

  buscaPacientePorRG(){
    // this.pacienteRG == undefined || null || '' ? this.pacienteId = undefined : this.pacienteId
    if (this.pacienteRG !== undefined && this.pacienteRG !== null && this.pacienteRG !== '') {
        this.pacienteService.getByRG(this.pacienteRG).subscribe((resposta: PacienteED) => {
            this.pacienteId = resposta.id;
        });
    }
}





}
