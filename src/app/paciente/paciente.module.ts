import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteRoutingModule } from './paciente-routing.module';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ListarPacientesComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    NgbModule,
  ]
})
export class PacienteModule { }
