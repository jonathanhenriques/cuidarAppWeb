import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParametroExameRequest } from '../models/filtros/ParametroExameRequest';



@Injectable({
  providedIn: 'root'
})
export class ExameService {

  private examesUrl: string

  constructor(private http: HttpClient) {
    this.examesUrl = `${environment.urlTeste}/exames`
  }

  getAll(): Observable<any>{
    return this.http.get<any>(`${this.examesUrl}`)

  }


  getAllWithParameters(listaParametros: ParametroExameRequest): Observable<any> {
    let params = new HttpParams();

    if (listaParametros.medicoId) {
      params = params.set('medicoId', listaParametros.medicoId.toString());
    }

    if (listaParametros.situacao) {
      params = params.set('situacao', listaParametros.situacao.toString());
    }


    // if (listaParametros.medicoId != 0)
      // params = params.set('medicoId', listaParametros.medicoId);

    // if(listaParametros.isAtivo !== true)
    //   params = params.set('isAtivo', 'false')


    // if (nomeExame) {
    //   params = params.set('nomeExame', nomeExame);
    // }

    // if (localId) {
    //   params = params.set('localId', localId.toString());
    // }

    // if (dataExame) {
    //   params = params.set('dataExame', dataExame);
    // }

    return this.http.get<any>(`${this.examesUrl}`, { params: params }).pipe(
      tap(response => {
        console.log('Resposta da requisição:', response);
      }));
  }


}
