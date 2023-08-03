import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private medicosUrl: string

  constructor(private http: HttpClient) {
    this.medicosUrl = `${environment.urlTeste}/medicos`
  }

  getAllMedicos(): Observable<any>{
    return this.http.get<any>(`${this.medicosUrl}`).pipe(tap(response => console.log(response)))

  }

}
