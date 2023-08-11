import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarAtendenteComponent } from './cadastrar-atendente/cadastrar-atendente.component';
import { AtendenteMasterComponent } from './atendente-master/atendente-master.component';
import { ListarAtendenteComponent } from './listar-atendente/listar-atendente.component';

const routes: Routes = [
  { path: '', component: AtendenteMasterComponent  },
  // { path: 'cadastrar', component: CadastrarAtendenteComponent  },
  // { path: 'listar', component: ListarAtendenteComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtendenteRoutingModule { }
