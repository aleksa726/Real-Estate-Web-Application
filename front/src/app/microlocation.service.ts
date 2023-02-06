import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MicrolocationService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getAllMicrolocations() {
    return this.http.get(`${this.uri}/microlocation/getAllMicrolocations`);
  }

  getAllMicrolocationsForState2(state) {
    const data = {
      state: state
    }
    return this.http.post(`${this.uri}/microlocation/getAllMicrolocationsForState2`, data);
  }

  getAllMicrolocationsForState(city, state) {
    const data = {
      city: city,
      state: state
    }
    return this.http.post(`${this.uri}/microlocation/getAllMicrolocationsForState`, data);
  }

  getMicrolocationName(name) {
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/microlocation/getMicrolocationName`, data);
  }

  getAllMicrolocationsForCity(city) {
    const data = {
      city: city
    }
    return this.http.post(`${this.uri}/microlocation/getAllMicrolocationsForCity`, data);
  }

  addMicrolocation(city, state, microlocation) {
    const data = {
      city: city,
      state: state,
      microlocation: microlocation
    }
    return this.http.post(`${this.uri}/microlocation/addMicrolocation`, data);
  }

  checkMicrolocation(city, state, microlocation) {
    const data = {
      city: city,
      state: state,
      microlocation: microlocation
    }
    return this.http.post(`${this.uri}/microlocation/checkMicrolocation`, data);
  }

  addStreet(microlocation, street) {
    const data = {
      microlocation: microlocation,
      street: street
    }
    return this.http.post(`${this.uri}/microlocation/addStreet`, data);
  }

  deleteMicrolocation(microlocation) {
    const data = {
      microlocation: microlocation
    }
    return this.http.post(`${this.uri}/microlocation/deleteMicrolocation`, data);
  }
}
