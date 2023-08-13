import { ExameED } from 'src/app/models/ExameED';
import { ExameService } from './../../service/exame.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  @ViewChild('ParaImprimir', { static: false }) paraImprimir: ElementRef;

  private exame: ExameED =  {
    id: 0,
    codigo: '',
    nomeExame: '',
    medico: {
      nome: '',
      isAtivo: true
     },
    local: {
      nomeLocal: '',
      endereco:  {
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
  exames: ExameED[] = [];
  private filtro = {
    isAtivo: true,
    pagina: 0,
    itensPorPagina: 5,
  }
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

  displayReport = false;
  examesReport = [];

  pacienteRetornado: PacienteED

  private nomeExame: string;

  constructor(
    private exameService: ExameService ,
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


  pageChanged(event: any): void {
    // this.currentPage =  event!.first! / event!.rows!;
    console.log(`pag: ${this.currentPage-1}`)
    this.listarExames(this.currentPage-1);
  }

  async _carregarExamesReport(): Promise<any[]>{
    return this.exameService.findAll()
    .toPromise()
    .catch(error =>{
      console.log(error);
    })
  }

  async carregarExamesReport(){
    this.examesReport = [];
    for (let page = 0; page < Math.round(this.totalItems / 5); page++) {
      const data = await this._carregarExamesReport() as any;
      this.examesReport = [...this.examesReport ];
  };
  this.displayReport = true;
    setTimeout(() => {
        this.displayReport = false;
    }, 1000);
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

  buscaPacientePorRG(){
    // this.pacienteRG == undefined || null || '' ? this.pacienteId = undefined : this.pacienteId
    if (this.pacienteRG !== undefined && this.pacienteRG !== null && this.pacienteRG !== '') {
        this.pacienteService.findByRgPaciente(this.pacienteRG).subscribe((resposta: PacienteED) => {
            this.pacienteId = resposta.id;
        });
    }
}



ativarExame(codigo: string | undefined): void {
  if(codigo != null && codigo != undefined){
    this.exameService.ativarExame(codigo).subscribe(() => {
      console.log('Exame ativado com sucesso!')
      this.recarregarPagina();
    }, (error) => {
      console.log('Deu errado')
    })
  }
}


cancelarExame(codigo: string | undefined): void {
 if(codigo != null && codigo != undefined){
  this.exameService.cancelarExame(codigo).subscribe(() => {
    console.log('Exame cancelado com sucesso!')
    this.recarregarPagina();
  }, (error) => {
    console.log('Deu errado')
  })
}
 }

 recarregarPagina() {
  window.location.reload();
}


// async gerarPDF() {
//   const doc = new jsPDF();
//   const content = this.paraImprimir.nativeElement;

//   // Renderiza o conteúdo HTML como uma imagem usando dom-to-image
//   // const image = await domtoimage.toPng(content);

//   // Adiciona a imagem ao PDF
//   // doc.addImage(image, 'PNG', 15, 10, 180, 0);

//   // Salva o PDF
//   doc.save('seu-arquivo.pdf');
// }



}
