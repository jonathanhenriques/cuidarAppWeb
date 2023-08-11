import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtendenteRoutingModule } from './atendente-routing.module';
import { CadastrarAtendenteComponent } from './cadastrar-atendente/cadastrar-atendente.component';
import { AtendenteMasterComponent } from './atendente-master/atendente-master.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListarAtendenteComponent } from './listar-atendente/listar-atendente.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CadastrarAtendenteComponent, AtendenteMasterComponent, ListarAtendenteComponent],
  imports: [
    CommonModule,
    AtendenteRoutingModule,


    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule ,
    // NgxPaginationModule,
  ]
})
export class AtendenteModule { }
