import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  registerAgency(name, adress, city, phone, pib) {
    const data = {
      name: name,
      adress: adress,
      city: city,
      phone: phone,
      pib: pib
    }

    return this.http.post(`${this.uri}/agency/register`, data);
  }

  getAllAgencies() {
    return this.http.get(`${this.uri}/agency/getAllAgencies`)
  }

  getAgency(name) {
    const data = {
      name: name
    }

    return this.http.post(`${this.uri}/agency/getAgency`, data);
  }

  checkAgency(name) {
    const data = {
      name: name
    }
    return this.http.post(`${this.uri}/agency/checkAgency`, data);
  }
}
