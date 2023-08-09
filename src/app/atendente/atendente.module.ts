import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtendenteRoutingModule } from './atendente-routing.module';
import { CadastrarAtendenteComponent } from './cadastrar-atendente/cadastrar-atendente.component';
import { AtendenteMasterComponent } from './atendente-master/atendente-master.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CadastrarAtendenteComponent, AtendenteMasterComponent],
  imports: [
    CommonModule,
    AtendenteRoutingModule,


    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AtendenteModule { }
