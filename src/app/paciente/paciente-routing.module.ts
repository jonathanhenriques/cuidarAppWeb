import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { CadastrarPacienteComponent } from './cadastrar-paciente/cadastrar-paciente.component';
import { DetailsPacienteComponent } from './details-paciente/details-paciente.component';



const routes: Routes = [
  { path: 'cadastrar', component: CadastrarPacienteComponent  },
  { path: 'listar', component: ListarPacientesComponent  },
  { path: 'paciente/:id', component: DetailsPacienteComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
