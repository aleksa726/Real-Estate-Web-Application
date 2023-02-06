import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  login(username, password) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  registerUser(firstname, lastname, username, password,
    passwordConfirm, city, birthday, phone, email, agency, licence, type, pending, file = null, filename = null) {

    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      passwordConfirm: passwordConfirm,
      city: city,
      birthday: birthday,
      phone: phone,
      email: email,
      agency: agency,
      licence: licence,
      type: type,
      pending: pending,
      file: file,
      filename: filename
    }

    const form_data: FormData = new FormData();
    form_data.append('user', JSON.stringify(data));
    form_data.append('image', file, username + '_image');

    return this.http.post(`${this.uri}/users/register`, form_data);
  }

  changePassword(username, oldPassword, newPassword) {
    const data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    return this.http.post(`${this.uri}/users/changePassword`, data);
  }

  getAllPendingUsers() {
    return this.http.get(`${this.uri}/users/getAllPendingUsers`);
  }

  getAllUsers() {
    return this.http.get(`${this.uri}/users/getAllUsers`);
  }

  acceptUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/acceptUser`, data);
  }

  declineUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/declineUser`, data);
  }

  getUser(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/getUser`, data);
  }

  updateUser(firstname, lastname, username, password,
    city, birthday, phone, email, agency, licence, type) {
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      city: city,
      birthday: birthday,
      phone: phone,
      email: email,
      agency: agency,
      licence: licence,
      type: type,
    }
    return this.http.post(`${this.uri}/users/updateUser`, data);
  }

  updateSeller(username, phone, email, agency, type) {
    const data = {
      username: username,
      phone: phone,
      email: email,
      agency: agency,
      type: type,
    }
    return this.http.post(`${this.uri}/users/updateSeller`, data);
  }

  addFavourite(listing, username) {
    const data = {
      username: username,
      favouriteListings: listing
    }
    return this.http.post(`${this.uri}/users/addFavourite`, data);
  }

  removeFavourite(listing, username) {
    const data = {
      username: username,
      favouriteListings: listing
    }
    return this.http.post(`${this.uri}/users/removeFavourite`, data);
  }

  checkUsername(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/checkUsername`, data);
  }

  checkEmail(email) {
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/users/checkEmail`, data);
  }


}
