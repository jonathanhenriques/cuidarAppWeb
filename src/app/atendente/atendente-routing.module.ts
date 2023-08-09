import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarAtendenteComponent } from './cadastrar-atendente/cadastrar-atendente.component';
import { AtendenteMasterComponent } from './atendente-master/atendente-master.component';

const routes: Routes = [
  { path: '', component: AtendenteMasterComponent  },
  { path: 'cadastrar', component: CadastrarAtendenteComponent  },
  // { path: 'listar', component: CadastrarAtendenteComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtendenteRoutingModule { }
