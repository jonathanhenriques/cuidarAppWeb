import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';



const routes: Routes = [
  // { path: 'cadastrar', component: CadastrarPacientesComponent  },
  { path: 'listar', component: ListarPacientesComponent  },
  // { path: 'detalhe-paciente/:id', component: DetailsPacienteComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
