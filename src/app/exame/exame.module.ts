import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListarExamesComponent } from './listar-exames/listar-exames.component';
import { PacienteRoutingModule } from '../paciente/paciente-routing.module';
import { ExameRoutingModule } from './exame-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { DetailsExameComponent } from './details-exame/details-exame.component';
import { CadastrarExameComponent } from './cadastrar-exame/cadastrar-exame.component';



@NgModule({
  declarations: [ListarExamesComponent, DetailsExameComponent, CadastrarExameComponent],
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
