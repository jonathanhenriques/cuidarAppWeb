import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'pacientes', loadChildren: () => import('./paciente/paciente.module').then((module) => module.PacienteModule) },
  { path: 'exames', loadChildren: () => import('./exame/exame.module').then((module) => module.ExameModule) },
  { path: 'atendentes', loadChildren: () => import('./atendente/atendente.module').then((module) => module.AtendenteModule) },
  { path: 'medicos', loadChildren: () => import('./medico/medico.module').then((module) => module.MedicoModule) },
  { path: 'locais', loadChildren: () => import('./local/local.module').then((module) => module.LocalModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
