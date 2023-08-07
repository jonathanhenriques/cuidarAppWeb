import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}
