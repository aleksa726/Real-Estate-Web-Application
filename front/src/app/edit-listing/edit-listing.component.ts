import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from '../agency.service';
import { BusService } from '../bus.service';
import { CityService } from '../city.service';
import { ListingService } from '../listing.service';
import { MicrolocationService } from '../microlocation.service';
import { Agency } from '../models/agency';
import { Bus } from '../models/bus';
import { City } from '../models/city';
import { Listing } from '../models/listing';
import { Microlocation } from '../models/microlocation';
import { State } from '../models/state';
import { Street } from '../models/street';
import { User } from '../models/user';
import { StateService } from '../state.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {

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

  listing: Listing;

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


  name2: String;
  grad2: String;
  opstina2: String;
  mikrolokacija2: String;
  ulica2: String;
  tip2: String;
  kvadrata2: Number;
  soba2: Number;
  godina2: Number;
  stanje2: String;
  grejanje2: String;
  sprat2: Number;
  ukupnoSpratova2: Number;
  parking2: String;
  mesecneRezije2: Number;
  cena2: Number;
  opis2: String;
  terasa2: Boolean;
  lodja2: Boolean;
  balkon2: Boolean;
  lift2: Boolean;
  podrum2: Boolean;
  garaza2: Boolean;
  basta2: Boolean;
  klima2: Boolean;
  internet2: Boolean;
  interfon2: Boolean;
  telefon2: Boolean;
  linije2: String;

  constructor(private listingService: ListingService, private busService: BusService, private userService: UserService, private agencyService: AgencyService, private activatedRoute: ActivatedRoute, private cityService: CityService, private stateService: StateService, private microlocationService: MicrolocationService, private router: Router) { }

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



    this.getUser(sessionStorage.getItem("username"));

    this.activatedRoute.paramMap.subscribe(parameterMap => {
      const urlNaslov = parameterMap.get('naslov');
      console.log(urlNaslov)
      this.listingService.getListing(urlNaslov).subscribe((data: Listing) => {
        this.listing = data;

        this.name2 = this.listing.naslov
        this.grad2 = this.listing.grad
        this.opstina2 = this.listing.opstina
        this.mikrolokacija2 = this.listing.mikrolokacija
        this.ulica2 = this.listing.ulica
        this.tip2 = this.listing.tip
        this.kvadrata2 = this.listing.kvadrata
        this.soba2 = this.listing.soba
        this.godina2 = this.listing.godina
        this.stanje2 = this.listing.stanje
        this.grejanje2 = this.listing.grejanje
        this.sprat2 = this.listing.sprat
        this.ukupnoSpratova2 = this.listing.ukupnoSpratova
        this.parking2 = this.listing.parking
        this.mesecneRezije2 = this.listing.mesecneRezije
        this.cena2 = this.listing.cena
        this.opis2 = this.listing.opis
        this.terasa2 = this.listing.terasa
        this.lodja2 = this.listing.lodja
        this.balkon2 = this.listing.balkon
        this.lift2 = this.listing.lift
        this.podrum2 = this.listing.podrum
        this.garaza2 = this.listing.garaza
        this.basta2 = this.listing.basta
        this.klima2 = this.listing.klima
        this.internet2 = this.listing.internet
        this.interfon2 = this.listing.interfon
        this.telefon2 = this.listing.telefon
        this.linije2 = this.listing.linije

        this.name = this.name2
        this.grad = this.grad2
        this.opstina = this.opstina2
        this.mikrolokacija = this.mikrolokacija2
        this.ulica = this.ulica2
        this.tip = this.tip2
        this.kvadrata = this.kvadrata2
        this.soba = this.soba2
        this.godina = this.godina2
        this.stanje = this.stanje2
        this.grejanje = this.grejanje2
        this.sprat = this.sprat2
        this.ukupnoSpratova = this.ukupnoSpratova2
        this.parking = this.parking2
        this.mesecneRezije = this.mesecneRezije2
        this.cena = this.cena2
        this.opis = this.opis2
        this.terasa = this.terasa2
        this.lodja = this.lodja2
        this.balkon = this.balkon2
        this.lift = this.lift2
        this.podrum = this.podrum2
        this.garaza = this.garaza2
        this.basta = this.basta2
        this.klima = this.klima2
        this.internet = this.internet2
        this.interfon = this.interfon2
        this.telefon = this.telefon2
        this.linije = this.linije2

        this.cityService.getAllCities().subscribe((data: City[]) => {
          this.cities = data;
          this.stateService.getAllStatesForCity(this.grad).subscribe((data: State[]) => {
            this.states = data;
            this.microlocationService.getAllMicrolocationsForState(this.grad, this.opstina).subscribe((data: Microlocation[]) => {
              this.microlocations = data;
              this.microlocationService.getMicrolocationName(this.mikrolokacija).subscribe((data: Microlocation) => {
                this.streets = data[0].streets;
              })
            })
          })
        })

      })
    })


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

  azurirajNekretninu() {
    this.listingService.updateListing(
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
    ).subscribe((resp) => {
      if (resp['message'] == 'ok') {
        alert("OK")
      } else {
        alert("ERROR")
      }
    })
    location.reload();
  }

  onCitySelected(event) {
    this.stateService.getAllStatesForCity(this.grad).subscribe((data: State[]) => {
      this.states = data;
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

}
