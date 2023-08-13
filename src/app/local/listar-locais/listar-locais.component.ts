import { Component, OnInit } from '@angular/core';
import { LocalED } from 'src/app/models/LocalED';
import { LocalFiltro } from 'src/app/models/filtros/LocalFiltro';
import { ParametroLocalRequest } from 'src/app/models/filtros/ParametroLocalRequest';
import { LocalService } from 'src/app/service/local.service';

@Component({
  selector: 'app-listar-locais',
  templateUrl: './listar-locais.component.html',
  styleUrls: ['./listar-locais.component.scss']
})
export class ListarLocaisComponent implements OnInit {



  listaLocais: LocalED[] = [];
  situacaoLocalSelecionado: true;
  nomeLocalFiltroPesquisa: string;
  endRuaFiltroPesquisa: string;
  endBairroFiltroPesquisa: string;
  endCepFiltroPesquisa: string;
  endCidadeFiltroPesquisa: string;
  tipoResidenciaLocalSelecionado: string;

  currentPage: number = 0;
  totalItems = 0;
  itemsPerPage = 5;

  filtro: LocalFiltro = {
    isAtivo:true,
    pagina: 0,
    itensPorPagina: 5,
  };

  constructor(
    private localService: LocalService,
    ){}

  ngOnInit(): void {

    this.listarLocais(this.currentPage);
  }





  listarLocais(pagina: number): void {

    const listaParametros: ParametroLocalRequest = {
      // codigo: this.codigoExame,
      // id: this.id,

      nomeLocal: this.nomeLocalFiltroPesquisa,
      isAtivo: this.situacaoLocalSelecionado,
      endRua: this.endRuaFiltroPesquisa,
      endBairro: this.endBairroFiltroPesquisa,
      endCidade: this.endCidadeFiltroPesquisa,
      endCep: this.endCepFiltroPesquisa
    };


    this.filtro.pagina = pagina;

    this.localService
    .findAllWithParameters(listaParametros,this.filtro)
    .then((dataLocais: any) => {
      console.log(dataLocais,null,2)
      this.listaLocais = dataLocais.locais;
      this.totalItems = dataLocais.total;
      console.table(this.listaLocais)
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
    this.listarLocais(this.currentPage-1);
  }



  desativarMedico(id: number | undefined){
    if(id != undefined && id != null){
    this.localService.desativarLocal(id).subscribe(() => {
      this.recarregarPagina();
      // this.atendentePassado = atendenteData;
      // this.toastr.success('Mensagem de sucesso', 'Título da notificação');
    },(error) => console.error('deu errado'));
    }
  }

  ativarMedico(id: number | undefined){
    if(id != undefined && id != null){
    this.localService.ativarLocal(id).subscribe(() => {
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


