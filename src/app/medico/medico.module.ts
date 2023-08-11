import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoRoutingModule } from './medico-routing.module';
import { CadastrarMedicoComponent } from './cadastrar-medico/cadastrar-medico.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MedicoMasterComponent } from './medico-master/medico-master.component';
import { ListarMedicoComponent } from './listar-medico/listar-medico.component';


@NgModule({
  declarations: [
    MedicoMasterComponent,CadastrarMedicoComponent, ListarMedicoComponent
  ],
  imports: [
    CommonModule,
    MedicoRoutingModule,




    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule ,
    // NgxPaginationModule,
  ]
})
export class MedicoModule { }
