import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParametroExameRequest } from '../models/filtros/ParametroExameRequest';
import { ExameFiltro } from '../models/filtros/ExameFiltro';



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


  getAllWithParameters(listaParametros: ParametroExameRequest, filtro: ExameFiltro): Promise<any> {
    let params = new HttpParams() //os parametros precisam estar como strings
    .set('page', filtro.pagina.toString())
    .set('size', filtro.itensPorPagina.toString());


    if (listaParametros.codigo) {
      params = params.set('codigo', listaParametros.codigo?.toString());
    }

    if (listaParametros.pacienteId) {
      params = params.set('pacienteId', listaParametros.pacienteId.toString());
    }

    if (listaParametros.pacienteCodigo) {
      params = params.set('pacienteCodigo', listaParametros.pacienteCodigo.toString());
    }

    if (listaParametros.pacienteRG) {
      params = params.set('pacienteRG', listaParametros.pacienteRG.toString());
    }

    if (listaParametros.medicoId) {
      params = params.set('medicoId', listaParametros.medicoId.toString());
    }

    if (listaParametros.localId) {
      params = params.set('localId', listaParametros.localId.toString());
    }

    if (listaParametros.atendenteId) {
      params = params.set('atendenteId', listaParametros.atendenteId.toString());
    }

    if (listaParametros.nomeExame) {
      params = params.set('nomeExame', listaParametros.nomeExame.toString());
    }

    if (listaParametros.dataExame) {
      params = params.set('dataExame', listaParametros.dataExame.toString());
    }

    if (listaParametros.valor) {
      params = params.set('valor', listaParametros.valor.toString());
    }

    if (listaParametros.isAtivo) {
      params = params.set('isAtivo', listaParametros.isAtivo.toString());
    }

    return firstValueFrom(this.http.get<any>(`${this.examesUrl}`, { params: params }))
    .then(
      (response: any) => {
        const exames = response['content'];

        const resultado = {
          exames,
          total: response['totalElements']
        }
        return resultado;
      });

  }

}
