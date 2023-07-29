import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteRoutingModule } from './paciente-routing.module';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    ListarPacientesComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    NgbModule,
    NgbPaginationModule ,
    // NgxPaginationModule,
  ]
})
export class PacienteModule { }
