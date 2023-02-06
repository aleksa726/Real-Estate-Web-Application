import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencyService } from '../agency.service';
import { CityService } from '../city.service';
import { ListingService } from '../listing.service';
import { MicrolocationService } from '../microlocation.service';
import { Agency } from '../models/agency';
import { City } from '../models/city';
import { Microlocation } from '../models/microlocation';
import { State } from '../models/state';
import { User } from '../models/user';
import { StateService } from '../state.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-listing-json',
  templateUrl: './create-listing-json.component.html',
  styleUrls: ['./create-listing-json.component.css']
})
export class CreateListingJsonComponent implements OnInit {

  dataValid: Boolean;

  selectedFile: File;
  fileName: String;

  imageNotSelectedError: String = "";

  errorMess: String = "";

  name: String;
  grad: String;
  opstina: String;
  mikrolokacija: String;
  ulica: String;
  tip: String;
  kvadrata: Number;
  soba: Number;
  godina: Number;
  stanje: String;
  grejanje: String;
  sprat: Number;
  ukupnoSpratova: Number;
  parking: String;
  mesecneRezije: Number;
  cena: Number;
  opis: String;
  terasa: Boolean;
  lodja: Boolean;
  balkon: Boolean;
  lift: Boolean;
  podrum: Boolean;
  garaza: Boolean;
  basta: Boolean;
  klima: Boolean;
  internet: Boolean;
  interfon: Boolean;
  telefon: Boolean;
  linije: String;
  selectedFiles: FileList = null;
  filesNames: String = "";

  type: String;
  user: User;
  agencija: Agency;

  constructor(private listingService: ListingService, private userService: UserService, private agencyService: AgencyService, private cityService: CityService, private stateService: StateService, private microlocationService: MicrolocationService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Prodavac" && sessionStorage.getItem("type") != "Agent") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
    this.dataValid = false;

    this.terasa = false;
    this.lodja = false;
    this.balkon = false;
    this.lift = false;
    this.podrum = false;
    this.garaza = false;
    this.basta = false;
    this.klima = false;
    this.internet = false;
    this.interfon = false;
    this.telefon = false;

    this.getUser(sessionStorage.getItem("username"));

  }

  getUser(username) {
    this.userService.getUser(username).subscribe((data: User) => {
      let currUser = data;
      this.user = currUser;
      this.type = currUser.type;
      if (this.type == "Agent") {

        this.agencyService.getAgency(this.user.agency).subscribe((data2: Agency) => {
          this.agencija = data2;
        })
      }
    })
  }

  onFilesSelected(event) {
    this.errorMess = ""
    if (event.target.files[0].type != "application/json") {
      this.errorMess = "Izabran je neodgovarajuci tip fajla!"
      return
    }
    this.selectedFile = event.target.files[0];
    this.fileName = (event.target.files[0].name);
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {

      let jsonObject = JSON.parse(fileReader.result as string);

      if (jsonObject.Realestate.Name == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.name = jsonObject.Realestate.Name;
      console.log(this.name)
      if (jsonObject.Realestate.City == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.grad = jsonObject.Realestate.City;

      if (jsonObject.Realestate.Municipality == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.opstina = jsonObject.Realestate.Municipality;

      if (jsonObject.Realestate.Municipality == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.opstina = jsonObject.Realestate.Municipality;

      if (jsonObject.Realestate.Microlocation == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.mikrolokacija = jsonObject.Realestate.Microlocation;

      if (jsonObject.Realestate.Street == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.ulica = jsonObject.Realestate.Street;

      if (jsonObject.Realestate.Type == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.tip = jsonObject.Realestate.Type;

      if (jsonObject.Realestate.Area == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.kvadrata = jsonObject.Realestate.Area;

      if (jsonObject.Realestate.Rooms == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.soba = jsonObject.Realestate.Rooms;

      if (jsonObject.Realestate.ConstructionYear == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.godina = jsonObject.Realestate.ConstructionYear;

      if (jsonObject.Realestate.State == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.stanje = jsonObject.Realestate.State;

      if (jsonObject.Realestate.Heating == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.grejanje = jsonObject.Realestate.Heating;

      if (jsonObject.Realestate.Floor == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.sprat = jsonObject.Realestate.Floor;

      if (jsonObject.Realestate.TotalFloors == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.ukupnoSpratova = jsonObject.Realestate.TotalFloors;

      if (jsonObject.Realestate.Parking == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.parking = jsonObject.Realestate.Parking;

      if (jsonObject.Realestate.MonthlyUtilities == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.mesecneRezije = jsonObject.Realestate.MonthlyUtilities;

      if (jsonObject.Realestate.Price == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.cena = jsonObject.Realestate.Price;

      if (jsonObject.Realestate.About == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      this.opis = jsonObject.Realestate.About;

      if (jsonObject.Realestate.Characteristics == null) {
        this.errorMess = "Izabrani fajl nema ocekivana polja"
        return
      }
      for (let i = 0; i < jsonObject.Realestate.Characteristics.length; i++) {
        if (jsonObject.Realestate.Characteristics[i] == "Terasa") {
          this.terasa = true;
        }
        if (jsonObject.Realestate.Characteristics[i] == "Lođa") {
          this.lodja = true;
        }
        if (jsonObject.Realestate.Characteristics[i] == "Francuski balkon") {
          this.balkon = true;
        }
        if (jsonObject.Realestate.Characteristics[i] == "Lift") {
          this.lift = true;
        }
        if (jsonObject.Realestate.Characteristics[i] == "Podrum") {
          this.podrum = true;
        }
        if (jsonObject.Realestate.Characteristics[i] == "Garaža") {
          this.garaza = true;
        }
        if (jsonObject.Realestate.Characteristics[i] == "Sa baštom") {
          this.basta = true;
        }
        if (jsonObject.Realestate.Characteristics[i] == "Klima") {
          this.klima = true;
        }
        if (jsonObject.Realestate.Characteristics[i] == "Interfon") {
          this.interfon = true;
        }
        if (jsonObject.Realestate.Characteristics[i] == "Internet") {
          this.internet = true;
        }
        if (jsonObject.Realestate.Characteristics[i] == "Telefon") {
          this.telefon = true;
        }
      }

      this.cityService.getCity(this.grad).subscribe((gradData: City) => {
        if (gradData[0]) {
          this.stateService.getStateName(this.opstina).subscribe((opstinaData: State) => {
            if (opstinaData[0]) {
              this.microlocationService.checkMicrolocation(this.grad, this.opstina, this.mikrolokacija).subscribe((mikrolokacijaData: Microlocation) => {
                if (mikrolokacijaData) {
                  if (mikrolokacijaData.streets.length > 0) {
                    let streetFound = false;
                    for (let i = 0; i < mikrolokacijaData.streets.length; i++) {
                      if (mikrolokacijaData.streets[i].name == this.ulica) {
                        streetFound = true;
                        console.log("Nadjeno")
                      }
                    }
                    if (streetFound) {
                      // sve ok
                      if (this.errorMess == "") {
                        this.dataValid = true;
                      }
                      else {
                        this.dataValid = false
                      }
                    }
                    else {
                      this.errorMess = "Izabrana ulica ne postoji u bazi podataka"
                      return
                    }
                  }
                  else {
                    this.errorMess = "Izabrana ulica ne postoji u bazi podataka"
                    return
                  }
                }
                else {
                  this.errorMess = "Izabrana mikrolokacija ne postoji u bazi podataka"
                  return
                }
              })
            }
            else {
              this.errorMess = "Izabrana opstina ne postoji u bazi podataka"
              return
            }
          })
        }
        else {
          this.errorMess = "Izabrani grad ne postoji u bazi podataka"
          return
        }
      })


    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  onImagesSelected(event) {
    this.imageNotSelectedError = ""
    this.selectedFiles = event.target.files;
    console.log(event.target.files)
    if (event.target.files.length < 3 || event.target.files.length > 6) {
      this.imageNotSelectedError = "Niste izabrali odgovarajuci broj fotografija!"
      return
    }
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].type != "image/png" && event.target.files[i].type != "image/jpeg") {
        this.imageNotSelectedError = "Niste izabrali odgovarajuci tip fajla!"
        return
      }
      else {
        this.filesNames += (event.target.files[i].name + ",");
        console.log(this.filesNames)
      }
    }
  }

  addListing() {
    if (this.user.type == "Agent") {
      this.listingService.addListing(
        this.name,
        this.grad,
        this.opstina,
        this.mikrolokacija,
        this.ulica,
        this.tip,
        this.kvadrata,
        this.soba,
        this.godina,
        this.stanje,
        this.grejanje,
        this.sprat,
        this.ukupnoSpratova,
        this.parking,
        this.mesecneRezije,
        this.cena,
        this.opis,
        this.terasa,
        this.lodja,
        this.balkon,
        this.lift,
        this.podrum,
        this.garaza,
        this.basta,
        this.klima,
        this.internet,
        this.interfon,
        this.telefon,
        this.linije,
        this.user.firstname,
        this.user.lastname,
        this.user.username,
        this.user.phone,
        this.agencija.name,
        this.agencija.adress,
        this.agencija.city,
        this.agencija.phone,
        this.agencija.pib,
        this.selectedFiles,
        this.filesNames
      ).subscribe((resp) => {
        if (resp['message'] == 'listing added') {
          alert("OK")
        } else {
          alert("ERROR")
        }
      })
      location.reload();
    }
    else {
      this.listingService.addListing(
        this.name,
        this.grad,
        this.opstina,
        this.mikrolokacija,
        this.ulica,
        this.tip,
        this.kvadrata,
        this.soba,
        this.godina,
        this.stanje,
        this.grejanje,
        this.sprat,
        this.ukupnoSpratova,
        this.parking,
        this.mesecneRezije,
        this.cena,
        this.opis,
        this.terasa,
        this.lodja,
        this.balkon,
        this.lift,
        this.podrum,
        this.garaza,
        this.basta,
        this.klima,
        this.internet,
        this.interfon,
        this.telefon,
        this.linije,
        this.user.firstname,
        this.user.lastname,
        this.user.username,
        this.user.phone,
        null,
        null,
        null,
        null,
        null,
        this.selectedFiles,
        this.filesNames
      ).subscribe((resp) => {
        if (resp['message'] == 'listing added') {
          alert("OK")
        } else {
          alert("ERROR")
        }
      })
      location.reload();
    }
  }


}
