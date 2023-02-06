import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getAllLines() {
    return this.http.get(`${this.uri}/bus/getAllLines`);
  }
}
