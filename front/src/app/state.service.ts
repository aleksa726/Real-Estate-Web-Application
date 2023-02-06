import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getAllStates() {
    return this.http.get(`${this.uri}/state/getAllStates`);
  }

  getStateName(state) {
    const data = {
      state: state
    }
    return this.http.post(`${this.uri}/state/getStateName`, data);
  }

  getAllStatesForCity(city) {
    const data = {
      city: city
    }
    return this.http.post(`${this.uri}/state/getAllStatesForCity`, data);
  }
}
