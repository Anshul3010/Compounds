import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private backendUrl = 'http://localhost:3000/v1/api/compound';

  constructor(private http: HttpClient) { }

  fetchCompounds(page:number, size:number){
    return this.http.get<any>(`${this.backendUrl}?page=${page}&size=${size}`);
  }

  fetchCompoundById(id:any){
    return this.http.get<any>(`${this.backendUrl}/${id}`);
  }

  updateCompound(id:any, updatedData:any){
    return this.http.patch<any>(`${this.backendUrl}/${id}`,updatedData);
  }

  deleteCompound(id:any){
    return this.http.delete<any>(`${this.backendUrl}/${id}`);
  }

  uploadFile(file:any){
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.backendUrl}/upload`,formData);
  }
}
