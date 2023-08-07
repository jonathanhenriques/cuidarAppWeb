import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListarExamesComponent } from './listar-exames/listar-exames.component';
import { PacienteRoutingModule } from '../paciente/paciente-routing.module';
import { ExameRoutingModule } from './exame-routing.module';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [ListarExamesComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgbPaginationModule ,
    // NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    // NgxMaskModule,





    ExameRoutingModule,
  ]
})
export class ExameModule { }
