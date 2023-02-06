import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getAllCities() {
    return this.http.get(`${this.uri}/city/getAllCities`);
  }

  getCity(city) {
    const data = {
      city: city
    }
    return this.http.post(`${this.uri}/city/getCity`, data);
  }
}
