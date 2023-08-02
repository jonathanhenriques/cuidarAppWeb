import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { PacienteModule } from './paciente/paciente.module';
import { HttpClientModule } from '@angular/common/http';
import { MensagemComponent } from './shared/mensagem/mensagem.component';
import { ListarExamesComponent } from './exame/listar-exames/listar-exames.component';
import { ExameModule } from './exame/exame.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MensagemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,




    PacienteModule,
    ExameModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
