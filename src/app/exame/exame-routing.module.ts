import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarExamesComponent } from './listar-exames/listar-exames.component';
import { DetailsExameComponent } from './details-exame/details-exame.component';
import { CadastrarExameComponent } from './cadastrar-exame/cadastrar-exame.component';

const routes: Routes = [
  { path: 'listar', component: ListarExamesComponent  },
  { path: 'detalhes-exame/:codigo', component: DetailsExameComponent  },
  { path: 'cadastrar/:codigo', component: CadastrarExameComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExameRoutingModule { }
