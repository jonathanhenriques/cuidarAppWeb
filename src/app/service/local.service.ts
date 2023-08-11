import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParametroLocalRequest } from '../models/filtros/ParametroLocalRequest';
import { LocalED } from '../models/LocalED';
import { LocalFiltro } from '../models/filtros/LocalFiltro';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private locaisUrl: string

  constructor(private http: HttpClient) {
    this.locaisUrl = `${environment.urlTeste}/locais`
  }

  getAllLocais(): Promise<any>{
    return firstValueFrom(this.http.get(`${this.locaisUrl}`))
    .then((response: any) => {
      const locais = response['content'];

      const resultado = {
        locais,
        total: response['totalElements']
      }

      return resultado;
    });

  }



  findAllWithParameters(listaParametros: ParametroLocalRequest, filtro: LocalFiltro): Promise<any> {
    let params = new HttpParams() //os parametros precisam estar como strings
    .set('page', filtro.pagina.toString())
    .set('size', filtro.itensPorPagina.toString());


    if (listaParametros.nomeLocal) {
      params = params.set('nomeLocal', listaParametros.nomeLocal?.toString());
    }

    if (listaParametros.isAtivo) {
      params = params.set('isAtivo', listaParametros.isAtivo.toString());
    }

    if (listaParametros.endRua) {
      params = params.set('endRua', listaParametros.endRua?.toString());
    }

    if (listaParametros.endBairro) {
      params = params.set('endBairro', listaParametros.endBairro?.toString());
    }

    if (listaParametros.endCep) {
      params = params.set('endCep', listaParametros.endCep?.toString());
    }

    if (listaParametros.endCidade) {
      params = params.set('endCidade', listaParametros.endCidade?.toString());
    }

    return firstValueFrom(this.http.get<any>(`${this.locaisUrl}`, { params: params }))
    .then(
      (response: any) => {
        const locais = response['content'];

        const resultado = {
          locais: locais,
          total: response['totalElements']
        }
        return resultado;
      });

  }




  postLocal(local: LocalED): Observable<LocalED> {
    return this.http.post<LocalED>(this.locaisUrl, local);
  }


  ativarLocal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.locaisUrl}/${id}/ativar`);
  }


  desativarLocal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.locaisUrl}/${id}/desativar`);
  }
}


