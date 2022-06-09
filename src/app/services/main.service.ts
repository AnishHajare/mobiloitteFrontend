import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private httpClient: HttpClient) { }
  BaseUrl = 'http://localhost:3000';
  
  register(values: any) {
    return this.httpClient.post<any>(this.BaseUrl + '/register',values)
  }
  
  login(values: any) {
    return this.httpClient.post<any>(this.BaseUrl + '/login',values)
  }
}
