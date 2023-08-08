// import { DialogExame } from 'src/app/shared/dialog-util/dialog-exame.component';
import { Component, OnInit } from '@angular/core';
import { ContatoED } from 'src/app/models/ContatoED';
import { EnderecoED } from 'src/app/models/EnderecoED';
import { PacienteED } from 'src/app/models/PacienteED';
import { PacienteFiltro } from 'src/app/models/filtros/PacienteFiltro';
// import { MatDialog } from '@angular/material/dialog';
import { PacienteService } from 'src/app/service/paciente.service';



@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.scss'],
})
export class ListarPacientesComponent implements OnInit {

  private paciente: PacienteED;
  pacientePassado: PacienteED;
  enderecoPassado: EnderecoED;
  contatoPassado: ContatoED;
  filtro = new PacienteFiltro();

  pacientes: PacienteED[] = [];

  currentPage: number = 0;
  totalItems = 0;
  itemsPerPage = 5;

  constructor(
    private pacienteService: PacienteService,
    ){}

  ngOnInit(): void {



    this.enderecoPassado = {
      endRua: '',
    endNumero: '',
    endBairro: '',
    endCidade: '',
    endTipoResidencia: '',
    endCep: '',
    endObservacao: ''
  };

    this.contatoPassado = {
      celular: '',
      telefone: '',
      contFacebook: '',
      contInstagram: '',
      email: ''
    };

    this.pacientePassado = {
      nome: '',
      dataNasc: '',
      idade: 1,
      rg: '',
      estadoCivil: '',
      filhos: 0,
      nomeResponsavelPaciente: '',
      contato: this.contatoPassado,
      profissao: '',
      endereco: this.enderecoPassado,
      deficiente: false,
      deficiencia: '',
      deficienciaFamilia: '',
      convenio: false,
      observacao: '',
      isAceite: false, //substitui assinatura
      indicacao: '',
      isAtivo: true,
    }

    this.listarPacientes(this.currentPage);
  }



  listarPacientes(pagina: number): void {
    this.filtro.pagina = pagina;

    this.pacienteService
    .findAllPacientes(this.filtro)
    .then((dataPacientes: any) => {
      this.pacientes = dataPacientes.pacientes;
      this.totalItems = dataPacientes.total;
      console.table(this.pacientes)
      console.warn(this.totalItems)
      // console.table(this.pacientes[0].nome)
    },
    error => {
      console.log('Erro ao obter pacientes:', error);
    }
    );
  }

  pageChanged(event: any): void {
    // this.currentPage =  event!.first! / event!.rows!;
    console.log(`pag: ${this.currentPage-1}`)
    this.listarPacientes(this.currentPage-1);
  }

  listarPacientesAtivos(): void {
    this.pacienteService
    .findAllPacientesAtivos(true)
    .subscribe((dataPacientes: PacienteED[]) => {
      this.pacientes = dataPacientes;
      });
  }





}

