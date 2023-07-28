import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { PacienteED}from '../models/PacienteED';


@Injectable({
  providedIn: 'root',
})
export class PacientesService {

  constructor(private http: HttpClient) {}

  // token = {
    //   headers: new HttpHeaders(),
    // };

    url = environment.urlTeste;

  // valor = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmcm9kb0BlbWFpbC5jb20iLCJpc3MiOiJBUEkgSW5zdGl0dXRvIENyaWFyIiwiZXhwIjoxNjgzNDM3MTI1fQ.aJy2GNe-9cGmrmPMC5Y8nTHjPie9suHVobLD_VIsYKw'

  // token = {
  //   headers: new HttpHeaders().set('Authorization', this.valor)
  // };


  // private baseUrl = 'http://localhost:8081/api/v1/pacientes';

  obterPacientePorId(id: number): Observable<PacienteED> {
    const url = `${this.url}/pacientes/${id}`;
    return this.http.get<PacienteED>(url);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any>(`${this.url}/usuario/todos`/*, this.token*/).pipe(
      tap(response => console.log(response)));
  }


  obterTodosPacientes(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.url}/pacientes`/*, this.token*/))
    .then((response: any) => response['content']);
  }



  cadastrarPaciente(paciente: any): Observable<any> {
    return this.http.post<any>(`${this.url}/pacientes`, paciente /*,this.token*/).pipe(
      tap(response => console.log('respo : '+response)));
  }


  getAllPacientes(): Promise<any[]> {
    return firstValueFrom(this.http.get<any[]>(`${this.url}/pacientes`/*, this.token*/))
    .then((response: any) => response['content']);
  }

  getAllPacientesAtivos(ativo: boolean): Observable<PacienteED[]> {
    return this.http.get<PacienteED[]>(
    this.url + `/pacientes/isAtivo/${ativo}` /*this.token*/
    );
  }

  getPacienteById(id: number): Observable<PacienteED> {
    return this.http.get<PacienteED>(
      this.url + `/pacientes/${id}` /*this.token*/
    );
  }

  getPacientesByNome(nome: string): Observable<PacienteED[]> {
    return this.http.get<PacienteED[]>(
      this.url + `pacientes/nomePaciente/${nome}` /*this.token*/
      );
    }

  getPacientesByNomeExame(nomeExame: string): Observable<PacienteED[]> {
    return this.http.get<PacienteED[]>(
    this.url + `pacientes/nomeExame/${nomeExame}` /*this.token*/
    );
  }

  getPacientesPorEndereco(nomeRua: string): Observable<PacienteED[]> {
    return this.http.get<PacienteED[]>(
    this.url + `/provas/descricao/${nomeRua}` /*this.token*/
    );
  }

  postPaciente(paciente: PacienteED): Observable<PacienteED> {
    return this.http.post<PacienteED>(
      this.url + '/pacientes',
      paciente /*this.token*/
    );
  }

  putPaciente(paciente: PacienteED): Observable<PacienteED> {
    return this.http.put<PacienteED>(
      this.url + '/pacientes',
      paciente /*this.token*/
    );
  }

  deleteLogicoPaciente(id: number) {
    return this.http.delete(this.url + `/pacientes/${id}` /*this.token*/);
  }
}



