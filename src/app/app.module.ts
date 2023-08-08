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
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MensagemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
    }),




    PacienteModule,
    ExameModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
