import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicoModule } from './medico.module';
import { MedicoMasterComponent } from './medico-master/medico-master.component';

const routes: Routes = [
  { path: '', component: MedicoMasterComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
