import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarExamesComponent } from './listar-exames/listar-exames.component';

const routes: Routes = [
  { path: 'listar', component: ListarExamesComponent  },
  // { path: 'cadastrar', component: CadastrarExameComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExameRoutingModule { }
