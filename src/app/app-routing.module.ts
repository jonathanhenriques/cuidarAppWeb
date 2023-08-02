import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'pacientes', loadChildren: () => import('./paciente/paciente.module').then((module) => module.PacienteModule) },
  { path: 'exames', loadChildren: () => import('./exame/exame.module').then((module) => module.ExameModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
