import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalRoutingModule } from './local-routing.module';
import { CadastrarLocalComponent } from './cadastrar-local/cadastrar-local.component';
import { LocalMasterComponent } from './local-master/local-master.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ListarLocaisComponent } from './listar-locais/listar-locais.component';


@NgModule({
  declarations: [LocalMasterComponent,CadastrarLocalComponent, ListarLocaisComponent],
  imports: [
    CommonModule,
    LocalRoutingModule,




    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule ,
    // NgxPaginationModule,
  ]
})
export class LocalModule { }
