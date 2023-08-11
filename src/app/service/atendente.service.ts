import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AtendenteED } from '../models/AtendenteED';
import { AtendenteFiltro } from '../models/filtros/AtendenteFiltro';
import { ParametroAtendenteRequest } from '../models/filtros/ParametroAtendenteRequest';

@Injectable({
  providedIn: 'root',
})
export class AtendenteService {
  private atendentesUrl: string;

  constructor(private http: HttpClient) {
    this.atendentesUrl = `${environment.urlTeste}/atendentes`;
  }

  getAllAtendentes(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.atendentesUrl}`)).then(
      (response: any) => {
        const atendentes = response['content'];

        const resultado = {
          atendentes,
          total: response['totalElements'],
        };

        return resultado;
      }
    );
  }



  findAllWithParameters(listaParametros: ParametroAtendenteRequest, filtro: AtendenteFiltro): Promise<any> {
    let params = new HttpParams() //os parametros precisam estar como strings
    .set('page', filtro.pagina.toString())
    .set('size', filtro.itensPorPagina.toString());


    if (listaParametros.nome) {
      params = params.set('nome', listaParametros.nome?.toString());
    }

    if (listaParametros.isAtivo) {
      params = params.set('isAtivo', listaParametros.isAtivo.toString());
    }

    return firstValueFrom(this.http.get<any>(`${this.atendentesUrl}`, { params: params }))
    .then(
      (response: any) => {
        const atendentes = response['content'];

        const resultado = {
          atendentes: atendentes,
          total: response['totalElements']
        }
        return resultado;
      });

  }




  postAtendente(atendente: AtendenteED): Observable<AtendenteED> {
    return this.http.post<AtendenteED>(this.atendentesUrl, atendente);
  }


  ativarAtendente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.atendentesUrl}/${id}/ativar`);
  }


  desativarAtendente(id: number): Observable<any> {
    return this.http.delete<any>(`${this.atendentesUrl}/${id}/desativar`);
  }
}
