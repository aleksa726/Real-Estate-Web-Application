import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgencyService } from '../agency.service';
import { BusService } from '../bus.service';
import { CityService } from '../city.service';
import { ListingService } from '../listing.service';
import { MicrolocationService } from '../microlocation.service';
import { Agency } from '../models/agency';
import { Bus } from '../models/bus';
import { City } from '../models/city';
import { Microlocation } from '../models/microlocation';
import { State } from '../models/state';
import { Street } from '../models/street';
import { User } from '../models/user';
import { StateService } from '../state.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {

  nameFormControl = new FormControl('', [Validators.required]);
  gradFormControl = new FormControl('', [Validators.required]);
  opstinaFormControl = new FormControl('', [Validators.required]);
  mikrolokacijaFormControl = new FormControl('', [Validators.required]);
  ulicaFormControl = new FormControl('', [Validators.required]);
  tipFormControl = new FormControl('', [Validators.required]);
  kvadrataFormControl = new FormControl('', [Validators.required]);
  sobaFormControl = new FormControl('', [Validators.required]);
  godinaFormControl = new FormControl('', [Validators.required]);
  stanjeFormControl = new FormControl('', [Validators.required]);
  grejanjeFormControl = new FormControl('', [Validators.required]);
  spratFormControl = new FormControl('', [Validators.required]);
  ukupnoSpratovaFormControl = new FormControl('', [Validators.required]);
  parkingFormControl = new FormControl('', [Validators.required]);
  mesecneRezijeFormControl = new FormControl('', [Validators.required]);
  cenaFormControl = new FormControl('', [Validators.required]);
  opisFormControl = new FormControl('', [Validators.required]);

  imageNotSelectedError: String = "";

  busLines: Bus[];
  cities: City[];
  states: State[];
  microlocations: Microlocation[];
  streets: Street[];

  type: String;
  user: User;
  agencija: Agency;

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

  constructor(private listingService: ListingService, private busService: BusService, private userService: UserService, private agencyService: AgencyService, private cityService: CityService, private stateService: StateService, private microlocationService: MicrolocationService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Prodavac" && sessionStorage.getItem("type") != "Agent") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
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

    this.busService.getAllLines().subscribe((data: Bus[]) => {
      this.busLines = data;
    })

    this.cityService.getAllCities().subscribe((data: City[]) => {
      this.cities = data;
    })

    this.getUser(sessionStorage.getItem("username"));
  }

  addListing() {
    let ret = false;
    if (this.nameFormControl.hasError('required')) {
      this.nameFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.gradFormControl.hasError('required')) {
      this.gradFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.opstinaFormControl.hasError('required')) {
      this.opstinaFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.mikrolokacijaFormControl.hasError('required')) {
      this.mikrolokacijaFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.ulicaFormControl.hasError('required')) {
      this.ulicaFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.tipFormControl.hasError('required')) {
      this.tipFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.kvadrataFormControl.hasError('required')) {
      this.kvadrataFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.sobaFormControl.hasError('required')) {
      this.sobaFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.godinaFormControl.hasError('required')) {
      this.godinaFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.stanjeFormControl.hasError('required')) {
      this.stanjeFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.grejanjeFormControl.hasError('required')) {
      this.grejanjeFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.spratFormControl.hasError('required')) {
      this.spratFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.ukupnoSpratovaFormControl.hasError('required')) {
      this.ukupnoSpratovaFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.parkingFormControl.hasError('required')) {
      this.parkingFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.mesecneRezijeFormControl.hasError('required')) {
      this.mesecneRezijeFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.cenaFormControl.hasError('required')) {
      this.cenaFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.opisFormControl.hasError('required')) {
      this.opisFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.selectedFiles == null) {
      this.imageNotSelectedError = "Slika nije izabrana"
      ret = true;
    }
    if (ret == false) {
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
      }
    }
  }

  onCitySelected(event) {
    this.stateService.getAllStatesForCity(this.grad).subscribe((data: State[]) => {
      this.states = data;
    })
    this.microlocationService.getAllMicrolocationsForCity(this.grad).subscribe((data: Microlocation[]) => {
      this.microlocations = data;
    })
  }

  onStateSelected(event) {
    this.microlocationService.getAllMicrolocationsForState(this.grad, this.opstina).subscribe((data: Microlocation[]) => {
      this.microlocations = data;
    })
  }

  onMicrolocationSelected(event) {
    this.microlocationService.getMicrolocationName(this.mikrolokacija).subscribe((data: Microlocation) => {
      this.streets = data[0].streets;
    })
  }

  redirectToJson() {
    this.router.navigate(['/seller/json']);
  }

}
