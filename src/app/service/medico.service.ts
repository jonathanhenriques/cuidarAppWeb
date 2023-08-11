import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MedicoED } from '../models/MedicoED';
import { ParametroMedicoRequest } from '../models/filtros/ParametroMedicoRequest';
import { MedicoFiltro } from '../models/filtros/MedicoFiltro';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  private medicosUrl: string;

  constructor(private http: HttpClient) {
    this.medicosUrl = `${environment.urlTeste}/medicos`;
  }

  getAllMedicos(): Observable<any> {
    return this.http
      .get<any>(`${this.medicosUrl}`)
      .pipe(tap((response) => console.log(response)));
  }

  findAllWithParameters(
    listaParametros: ParametroMedicoRequest,
    filtro: MedicoFiltro
  ): Promise<any> {
    filtro.ordenacao = filtro.ordenacao === 'asc' ? 'desc' : 'asc';
    let params = new HttpParams() //os parametros precisam estar como strings
      .set('page', filtro.pagina.toString())
      .set('size', filtro.itensPorPagina.toString())
      .set('sort', filtro.ordenacao.toString());
      // Altera a ordenação para a próxima vez que o botão for clicado

    if (listaParametros.nome) {
      params = params.set('nome', listaParametros.nome?.toString());
    }

    if (listaParametros.isAtivo) {
      params = params.set('isAtivo', listaParametros.isAtivo.toString());
    }

    return firstValueFrom(
      this.http.get<any>(`${this.medicosUrl}`, { params: params })
    ).then((response: any) => {
      const medicos = response['content'];

      const resultado = {
        medicos: medicos,
        total: response['totalElements'],
      };
      return resultado;
    });
  }

  postmedico(medico: MedicoED): Observable<MedicoED> {
    return this.http.post<MedicoED>(this.medicosUrl, medico);
  }

  ativarmedico(id: number): Observable<any> {
    return this.http.delete<any>(`${this.medicosUrl}/${id}/ativar`);
  }

  desativarmedico(id: number): Observable<any> {
    return this.http.delete<any>(`${this.medicosUrl}/${id}/desativar`);
  }
}
