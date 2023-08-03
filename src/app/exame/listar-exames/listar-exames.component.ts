import { ExameED } from 'src/app/models/ExameED';
import { ExameService } from './../../service/exame.service';
import { Component, OnInit } from '@angular/core';
import { ExameFiltro } from 'src/app/models/filtros/ExameFiltro';

import { MedicoService } from 'src/app/service/medico.service';
import { MedicoED } from 'src/app/models/MedicoED';
import { ParametroExameRequest } from 'src/app/models/filtros/ParametroExameRequest';

@Component({
  selector: 'app-listar-exames',
  templateUrl: './listar-exames.component.html',
  styleUrls: ['./listar-exames.component.scss']
})
export class ListarExamesComponent implements OnInit {

  private exame: ExameED = new ExameED();
  listaMedicos: MedicoED[] = [];
  private filtro = new ExameFiltro();

  exames: ExameED[] = [];
  medicoSelecionado: number[] = [];
  private medicoSelecaoEnvio: number;
  situacaoExameSelecionado: boolean = true;

  currentPage: number = 0;
  totalItems = 0;
  itemsPerPage = 5;

  private nomeExame: string;

  constructor(
    private exameService:ExameService ,
    private medicoService: MedicoService,
    ){}

  ngOnInit(): void {

    this.listarExames(this.currentPage);
    this.getAllMedicos()
  }



  listarExames(pagina: number): void {
    const listaParametros: ParametroExameRequest = {
      situacao: this.situacaoExameSelecionado,
      medicoId: this.medicoSelecionado[0]
    };

    this.filtro.pagina = pagina;

    this.exameService
      .getAllWithParameters(listaParametros)
      .subscribe((dataExames: any) => {
        this.exames = dataExames;
        this.totalItems = dataExames.total;
        console.table(this.exames);
        console.warn(this.medicoSelecionado);
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


}
