import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  updateListing(
    name,
    grad,
    opstina,
    mikrolokacija,
    ulica,
    tip,
    kvadrata,
    soba,
    godina,
    stanje,
    grejanje,
    sprat,
    ukupnoSpratova,
    parking,
    mesecneRezije,
    cena,
    opis,
    terasa,
    lodja,
    balkon,
    lift,
    podrum,
    garaza,
    basta,
    klima,
    internet,
    interfon,
    telefon,
    linije
  ) {

    const data = {
      name: name,
      grad: grad,
      opstina: opstina,
      mikrolokacija: mikrolokacija,
      ulica: ulica,
      tip: tip,
      kvadrata: kvadrata,
      soba: soba,
      godina: godina,
      stanje: stanje,
      grejanje: grejanje,
      sprat: sprat,
      ukupnoSpratova: ukupnoSpratova,
      parking: parking,
      mesecneRezije: mesecneRezije,
      cena: cena,
      opis: opis,
      terasa: terasa,
      lodja: lodja,
      balkon: balkon,
      lift: lift,
      podrum: podrum,
      garaza: garaza,
      basta: basta,
      klima: klima,
      internet: internet,
      interfon: interfon,
      telefon: telefon,
      linije: linije
    }

    return this.http.post(`${this.uri}/listing/updateListing`, data);
  }

  addListing(
    name,
    grad,
    opstina,
    mikrolokacija,
    ulica,
    tip,
    kvadrata,
    soba,
    godina,
    stanje,
    grejanje,
    sprat,
    ukupnoSpratova,
    parking,
    mesecneRezije,
    cena,
    opis,
    terasa,
    lodja,
    balkon,
    lift,
    podrum,
    garaza,
    basta,
    klima,
    internet,
    interfon,
    telefon,
    linije,
    ime,
    prezime,
    username,
    telefonProdavca,
    agencija,
    adresaAgencije,
    gradAgencije,
    telefonAgencije,
    pibAgencije,
    images,
    imagesNames
  ) {

    const data = {
      name: name,
      grad: grad,
      opstina: opstina,
      mikrolokacija: mikrolokacija,
      ulica: ulica,
      tip: tip,
      kvadrata: kvadrata,
      soba: soba,
      godina: godina,
      stanje: stanje,
      grejanje: grejanje,
      sprat: sprat,
      ukupnoSpratova: ukupnoSpratova,
      parking: parking,
      mesecneRezije: mesecneRezije,
      cena: cena,
      opis: opis,
      terasa: terasa,
      lodja: lodja,
      balkon: balkon,
      lift: lift,
      podrum: podrum,
      garaza: garaza,
      basta: basta,
      klima: klima,
      internet: internet,
      interfon: interfon,
      telefon: telefon,
      linije: linije,
      ime: ime,
      prezime: prezime,
      username: username,
      telefonProdavca: telefonProdavca,
      agencija: agencija,
      adresaAgencije: adresaAgencije,
      gradAgencije: gradAgencije,
      telefonAgencije: telefonAgencije,
      pibAgencije: pibAgencije,
      imagesNames: imagesNames
    }

    for (let i = 0; i < images.length; i++) {
      this.uploadImage(images[i]).subscribe((resp) => {
        if (resp['message'] == 'image added') {
          console.log("image added")
        } else {
          alert("ERROR")
        }
      })
    }

    return this.http.post(`${this.uri}/listing/addListing`, data);
  }

  addJSON(file, fileName) {
    const image_data = {
      imgName: file.name
    }
    const form_data: FormData = new FormData();
    form_data.append('user', JSON.stringify(image_data));
    form_data.append('image', file);
    return this.http.post(`${this.uri}/listing/uploadJSON`, form_data);
  }

  uploadImage(image) {
    let file = image;
    const image_data = {
      imgName: file.name
    }
    const form_data: FormData = new FormData();
    form_data.append('user', JSON.stringify(image_data));
    form_data.append('image', file, name + '_image');
    return this.http.post(`${this.uri}/listing/uploadListingImage`, form_data);
  }

  getAllListings() {
    return this.http.get(`${this.uri}/listing/getAllListings`)
  }

  getListing(naslov) {
    const data = {
      naslov: naslov
    }
    return this.http.post(`${this.uri}/listing/getListing`, data)
  }


  getAllListingsLimited(currentPage) {
    const data = {
      currentPage: currentPage
    }
    return this.http.post(`${this.uri}/listing/getAllListingsLimited`, data)
  }

  getAllListingsFromMicrolocation(mikrolokacija) {
    const data = {
      mikrolokacija: mikrolokacija
    }
    return this.http.post(`${this.uri}/listing/getAllListingsFromMicrolocation`, data);
  }

  filterListings(
    tip,
    grad,
    opstina,
    mikrolokacija,
    cenaDo,
    kvadraturaOd,
    brojSoba,
    currentPage
  ) {
    const data = {
      tip: tip,
      grad: grad,
      opstina: opstina,
      mikrolokacija: mikrolokacija,
      kvadraturaOd: kvadraturaOd,
      cenaDo: cenaDo,
      brojSoba: brojSoba,
      currentPage: currentPage
    }
    return this.http.post(`${this.uri}/listing/filterListings`, data);
  }

  filterListingsAdvanced(
    kvadraturaDo,
    kvadraturaOd,
    cenaDo,
    cenaOd,
    sobaOd,
    sobaDo,
    godinaOd,
    godinaDo,
    agencija,
    vlasnik,
    stanje,
    grejanje,
    spratOd,
    spratDo,
    rezijeOd,
    rezijeDo,
    terasa,
    lodja,
    balkon,
    lift,
    podrum,
    garaza,
    basta,
    klima,
    internet,
    interfon,
    telefon,
    currentPage
  ) {
    const data = {
      kvadraturaDo: kvadraturaDo,
      kvadraturaOd: kvadraturaOd,
      cenaDo: cenaDo,
      cenaOd: cenaOd,
      sobaOd: sobaOd,
      sobaDo: sobaDo,
      godinaOd: godinaOd,
      godinaDo: godinaDo,
      agencija: agencija,
      vlasnik: vlasnik,
      stanje: stanje,
      grejanje: grejanje,
      spratOd: spratOd,
      spratDo: spratDo,
      rezijeOd: rezijeOd,
      rezijeDo: rezijeDo,
      terasa: terasa,
      lodja: lodja,
      balkon: balkon,
      lift: lift,
      podrum: podrum,
      garaza: garaza,
      basta: basta,
      klima: klima,
      internet: internet,
      interfon: interfon,
      telefon: telefon,
      currentPage: currentPage
    }
    return this.http.post(`${this.uri}/listing/filterListingsAdvanced`, data);
  }

  getUserListings(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/listing/getUserListings`, data);
  }

  sell(naslov) {
    const data = {
      naslov: naslov
    }
    return this.http.post(`${this.uri}/listing/sell`, data);
  }

}
