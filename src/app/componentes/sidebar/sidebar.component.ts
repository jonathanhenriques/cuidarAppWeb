import { Component, OnInit } from '@angular/core';
import { ParametroExameRequest } from 'src/app/models/filtros/ParametroExameRequest';
import { ExameService } from 'src/app/service/exame.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  private filtro = {
    isAtivo: true,
    pagina: 0,
    itensPorPagina: 40,
  }

  exames: any;
  totalItems: number = 0;

  constructor(private exameService: ExameService) { }

  ngOnInit(): void {
    this.listarExames();
  }






  listarExames(pagina?: number): void {
    let dataHoje = new Date();
    const dataExameString = dataHoje.toISOString().substring(0, 10);
    let dataFormatada = new Date(dataExameString);

    const listaParametros: ParametroExameRequest = {
      dataExame: dataExameString,

    };


    // this.filtro.pagina = pagina;

    this.exameService
      .findAllWithParameters(listaParametros, this.filtro)
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



}
