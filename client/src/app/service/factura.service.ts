import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura.model';
import { environment } from '../../environments/environment';

const baseUrl = `${environment.apiUrl}/facturas`;

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Factura[]> {
    return this.http.get<Factura[]>(baseUrl);
  }

  get(id: any): Observable<Factura> {
    return this.http.get<Factura>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
