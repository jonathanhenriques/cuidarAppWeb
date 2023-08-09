import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AtendenteED } from '../models/AtendenteED';

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

  postAtendente(atendente: AtendenteED): Observable<AtendenteED> {
    return this.http.post<AtendenteED>(this.atendentesUrl, atendente);
  }
}
