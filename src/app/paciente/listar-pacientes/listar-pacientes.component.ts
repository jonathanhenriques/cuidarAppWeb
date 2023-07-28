// import { DialogExame } from 'src/app/shared/dialog-util/dialog-exame.component';
import { Component, OnInit } from '@angular/core';
import { PacienteED } from 'src/app/models/PacienteED';
// import { MatDialog } from '@angular/material/dialog';
import { PacientesService } from 'src/app/service/paciente.service';



@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.scss'],
})
export class ListarPacientesComponent implements OnInit {

  private paciente: PacienteED = new PacienteED();

  pacientes: PacienteED[] = [];

  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 5;

  constructor(
    private pacienteService: PacientesService,
    ){}

  ngOnInit(): void {

    this.listarPacientes();
  }

  listarPacientes(): void {
    this.pacienteService
    .getAllPacientes()
    .then((dataPacientes: any) => {
      this.pacientes = dataPacientes;
      this.totalItems = dataPacientes.totalElements;
      console.table(this.pacientes)
      console.table(this.pacientes[0].nome)
    },
    error => {
      console.log('Erro ao obter pacientes:', error);
    }
    );
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.listarPacientes();
  }

  listarPacientesAtivos(): void {
    this.pacienteService
    .getAllPacientesAtivos(true)
    .subscribe((dataPacientes: PacienteED[]) => {
      this.pacientes = dataPacientes;
      });
  }





}

