import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { PacienteED}from '../models/PacienteED';
import { PacienteFiltro } from '../models/filtros/PacienteFiltro';


@Injectable({
  providedIn: 'root',
})
export class PacienteService {

  private pacientesUrl: string

  constructor(private http: HttpClient) {
    this.pacientesUrl = `${environment.urlTeste}/pacientes`
  }

  // valor = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmcm9kb0BlbWFpbC5jb20iLCJpc3MiOiJBUEkgSW5zdGl0dXRvIENyaWFyIiwiZXhwIjoxNjgzNDM3MTI1fQ.aJy2GNe-9cGmrmPMC5Y8nTHjPie9suHVobLD_VIsYKw'

  // token = {
  //   headers: new HttpHeaders().set('Authorization', this.valor)
  // };


  // private baseUrl = 'http://localhost:8081/api/v1/pacientes';

  findByIdPaciente(id: number): Observable<PacienteED> {
    const url = `${this.pacientesUrl}/${id}`;
    return this.http.get<PacienteED>(url);
  }

  findByCodigoPaciente(codigoPaciente: string): Observable<any> {
    console.log('codigoPaciente: ' + codigoPaciente)
    const url = `${this.pacientesUrl}/${codigoPaciente}`;

    return this.http.get<PacienteED>(url).pipe(tap((retorno: any) => console.log('retorno: ' + retorno)))
  }

  findByRgPaciente(RG: string): Observable<PacienteED> {
    const url = `${this.pacientesUrl}/RG/${RG}`;
    return this.http.get<PacienteED>(url).pipe(tap((data:PacienteED) => console.log('pacienteRG: ' + data)));
  }


  postPaciente(paciente: any): Observable<any> {
    console.log("================================")
    console.log("corpo da req: ")
    console.log(JSON.stringify(paciente, null, 2))
    console.log("================================")
    return this.http.post<any>(`${this.pacientesUrl}`, paciente /*,this.token*/).pipe(
      tap(response => console.log('respo : '+response)));
  }


  findAllPacientes(filtro: PacienteFiltro): Promise<any> {

    // const headers = new HttpHeaders()
    //   .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams()
      .set('page', filtro.pagina.toString()) // Converte para string
      .set('size', filtro.itensPorPagina.toString()); // Converte para string


    if (filtro.isAtivo) {
      params = params.set('descricao', filtro.isAtivo);
    }

    return firstValueFrom(this.http.get(`${this.pacientesUrl}`, { params }))
    .then((response: any) => {
      const pacientes = response['content'];

      const resultado = {
        pacientes,
        total: response['totalElements']
      }

      return resultado;
    });
  }

  findAllPacientesAtivos(isAtivo: boolean): Observable<PacienteED[]> {
    return this.http.get<PacienteED[]>(
    this.pacientesUrl + `/isAtivo/${isAtivo}` /*this.token*/
    );
  }

  // findByIdPaciente(id: number): Observable<PacienteED> {
  //   return this.http.get<PacienteED>(
  //     this.pacientesUrl + `/${id}` /*this.token*/
  //   );
  // }

  findByNomePacientes(nome: string): Observable<PacienteED[]> {
    return this.http.get<PacienteED[]>(
      this.pacientesUrl + `/nomePaciente/${nome}` /*this.token*/
      );
    }

  findByNomeExamePacientes(nomeExame: string): Observable<PacienteED[]> {
    return this.http.get<PacienteED[]>(
    this.pacientesUrl + `/nomeExame/${nomeExame}` /*this.token*/
    );
  }

  findPacienteByEndereco(nomeRua: string): Observable<PacienteED[]> {
    return this.http.get<PacienteED[]>(
    this.pacientesUrl + `/provas/descricao/${nomeRua}` /*this.token*/
    );
  }

  putPaciente(paciente: PacienteED): Observable<PacienteED> {
    return this.http.put<PacienteED>(
      this.pacientesUrl,
      paciente /*this.token*/
    );
  }

  deleteLogicoPaciente(id: number) {
    return this.http.delete(this.pacientesUrl + `/${id}` /*this.token*/);
  }
}



