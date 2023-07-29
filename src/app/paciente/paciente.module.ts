import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteRoutingModule } from './paciente-routing.module';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { CadastrarPacienteComponent } from './cadastrar-paciente/cadastrar-paciente.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListarPacientesComponent,
    CadastrarPacienteComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbPaginationModule ,
    // NgxPaginationModule,
    ReactiveFormsModule,


    PacienteRoutingModule,
  ]
})
export class PacienteModule { }
