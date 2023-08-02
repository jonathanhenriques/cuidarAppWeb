import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

}
