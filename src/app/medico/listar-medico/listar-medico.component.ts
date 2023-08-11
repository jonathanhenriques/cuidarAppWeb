import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MedicoED } from 'src/app/models/MedicoED';
import { MedicoFiltro } from 'src/app/models/filtros/MedicoFiltro';
import { ParametroMedicoRequest } from 'src/app/models/filtros/ParametroMedicoRequest';
import { MedicoService } from 'src/app/service/medico.service';

@Component({
  selector: 'app-listar-medico',
  templateUrl: './listar-medico.component.html',
  styleUrls: ['./listar-medico.component.scss']
})
export class ListarMedicoComponent implements OnInit {


  listaMedicos: MedicoED[] = [];
  situacaoMedicoSelecionado: true;
  nomeMedicoFiltroPesquisa: string;

  currentPage: number = 0;
  totalItems = 0;
  itemsPerPage = 5;

  filtro: MedicoFiltro = {
    isAtivo:true,
    pagina: 0,
    itensPorPagina: 5,
    ordenacao: 'asc'
  };

  constructor(
    private medicoService: MedicoService,
    private toastr: ToastrService,
    ){}

  ngOnInit(): void {

    this.listarMedico(this.currentPage);
  }





  listarMedico(pagina: number): void {

    const listaParametros: ParametroMedicoRequest = {
      // codigo: this.codigoExame,
      // id: this.id,

      nome: this.nomeMedicoFiltroPesquisa,
      isAtivo: this.situacaoMedicoSelecionado,
    };


    this.filtro.pagina = pagina;

    this.medicoService
    .findAllWithParameters(listaParametros,this.filtro)
    .then((dataMedico: any) => {
      console.log(dataMedico,null,2)
      this.listaMedicos = dataMedico.medicos;
      this.totalItems = dataMedico.total;
      console.table(this.listaMedicos)
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
    this.listarMedico(this.currentPage-1);
  }



  desativarMedico(id: number | undefined){
    if(id != undefined && id != null){
    this.medicoService.desativarmedico(id).subscribe(() => {
      this.recarregarPagina();
      // this.atendentePassado = atendenteData;
      // this.toastr.success('Mensagem de sucesso', 'Título da notificação');
    },(error) => console.error('deu errado'));
    }
  }

  ativarMedico(id: number | undefined){
    if(id != undefined && id != null){
    this.medicoService.ativarmedico(id).subscribe(() => {
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

