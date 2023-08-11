import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AtendenteED } from 'src/app/models/AtendenteED';
import { AtendenteFiltro } from 'src/app/models/filtros/AtendenteFiltro';
import { ParametroAtendenteRequest } from 'src/app/models/filtros/ParametroAtendenteRequest';
import { AtendenteService } from 'src/app/service/atendente.service';

@Component({
  selector: 'app-listar-atendente',
  templateUrl: './listar-atendente.component.html',
  styleUrls: ['./listar-atendente.component.scss']
})
export class ListarAtendenteComponent implements OnInit {


  listaAtendentes: AtendenteED[] = [];
  situacaoAtendenteSelecionado: true;
  nomeAtendenteFiltroPesquisa: string;

  currentPage: number = 0;
  totalItems = 0;
  itemsPerPage = 5;

  filtro: AtendenteFiltro = {
    isAtivo:true,
    pagina: 0,
    itensPorPagina: 5
  };

  constructor(
    private atendenteService: AtendenteService,
    private toastr: ToastrService,
    ){}

  ngOnInit(): void {

    this.listarAtendentes(this.currentPage);
  }





  listarAtendentes(pagina: number): void {

    const listaParametros: ParametroAtendenteRequest = {
      // codigo: this.codigoExame,
      // id: this.id,

      nome: this.nomeAtendenteFiltroPesquisa,
      isAtivo: this.situacaoAtendenteSelecionado,
    };


    this.filtro.pagina = pagina;

    this.atendenteService
    .findAllWithParameters(listaParametros,this.filtro)
    .then((dataAtendentes: any) => {
      this.listaAtendentes = dataAtendentes.atendentes;
      this.totalItems = dataAtendentes.total;
      console.table(this.listaAtendentes)
      console.warn(this.totalItems)
      // console.table(this.pacientes[0].nome)
    },
    (error) => {
      console.log('Erro ao obter pacientes:', error);
    }
    );
  }

  pageChanged(event: any): void {
    // this.currentPage =  event!.first! / event!.rows!;
    console.log(`pag: ${this.currentPage-1}`)
    this.listarAtendentes(this.currentPage-1);
  }



  desativarAtendente(id: number | undefined){
    if(id != undefined && id != null){
    this.atendenteService.desativarAtendente(id).subscribe(() => {
      this.recarregarPagina();
      // this.atendentePassado = atendenteData;
      // this.toastr.success('Mensagem de sucesso', 'Título da notificação');
    },(error) => console.error('deu errado'));
    }
  }

  ativarAtendente(id: number | undefined){
    if(id != undefined && id != null){
    this.atendenteService.ativarAtendente(id).subscribe(() => {
      this.recarregarPagina();
      // this.atendentePassado = atendenteData;
      // this.toastr.success('Mensagem de sucesso', 'Título da notificação');
    },(error) => console.error('deu errado'));
    }
  }

  recarregarPagina() {
    window.location.reload();
  }

}

