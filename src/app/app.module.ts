import {  NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { PacienteModule } from './paciente/paciente.module';
import { HttpClientModule } from '@angular/common/http';
import { ExameModule } from './exame/exame.module';
import { NgxMaskModule } from 'ngx-mask';
import { AtendenteModule } from './atendente/atendente.module';
import { MedicoModule } from './medico/medico.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LocalModule } from './local/local.module';
// import { ComponentesModule } from './componentes/componentes.module';

@NgModule({
  declarations: [
    AppComponent,SidebarComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // FontAwesomeModule,

    NgxMaskModule.forRoot(),





    PacienteModule,
    ExameModule,
    AtendenteModule,
    MedicoModule,
    LocalModule,
    // ComponentesModule,
  ],
  // providers: [{provide:LOCALE_ID, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
