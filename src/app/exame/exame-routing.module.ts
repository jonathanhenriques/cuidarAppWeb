import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarExamesComponent } from './listar-exames/listar-exames.component';
import { DetailsExameComponent } from './details-exame/details-exame.component';

const routes: Routes = [
  { path: 'listar', component: ListarExamesComponent  },
  { path: 'detalhes/:id', component: DetailsExameComponent  },
  // { path: 'cadastrar', component: CadastrarExameComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExameRoutingModule { }
