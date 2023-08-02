import { ExameED } from 'src/app/models/ExameED';
import { ExameService } from './../../service/exame.service';
import { Component, OnInit } from '@angular/core';
import { ExameFiltro } from 'src/app/models/filtros/ExameFiltro';
import { PacienteED } from 'src/app/models/PacienteED';

@Component({
  selector: 'app-listar-exames',
  templateUrl: './listar-exames.component.html',
  styleUrls: ['./listar-exames.component.scss']
})
export class ListarExamesComponent implements OnInit {

  private exame: ExameED = new ExameED();
  filtro = new ExameFiltro();

  exames: ExameED[] = [];

  currentPage: number = 0;
  totalItems = 0;
  itemsPerPage = 5;

  constructor(
    private exameService:ExameService ,
    ){}

  ngOnInit(): void {

    this.listarExames(this.currentPage);
  }



  listarExames(pagina: number): void {
    this.filtro.pagina = pagina;

    this.exameService
    .getAll()
    .subscribe((dataExames: any) => {
      this.exames = dataExames;
      this.totalItems = dataExames.total;
      console.table(this.exames)
      console.warn(this.totalItems)
      // console.table(this.pacientes[0].nome)
    },
    );
  }

  pageChanged(event: any): void {
    // this.currentPage =  event!.first! / event!.rows!;
    console.log(`pag: ${this.currentPage-1}`)
    this.listarExames(this.currentPage-1);
  }


}
