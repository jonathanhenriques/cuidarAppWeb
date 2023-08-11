import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalMasterComponent } from './local-master/local-master.component';

const routes: Routes = [
  {path: '', component:LocalMasterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalRoutingModule { }
