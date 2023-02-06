import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from '../city.service';
import { ListingService } from '../listing.service';
import { MicrolocationService } from '../microlocation.service';
import { City } from '../models/city';
import { Listing } from '../models/listing';
import { Microlocation } from '../models/microlocation';
import { State } from '../models/state';
import { StateService } from '../state.service';

@Component({
  selector: 'app-user-pocetna',
  templateUrl: './user-pocetna.component.html',
  styleUrls: ['./user-pocetna.component.css']
})
export class UserPocetnaComponent implements OnInit {

  typeFormControl = new FormControl('', [Validators.required]);

  cities: City[];
  states: State[];
  microlocations: Microlocation[];

  tip: string = null;
  grad: string = null;
  opstina: string = null;
  mikrolokacija: string = null;
  kvadraturaOd: number = null;
  cenaDo: number = null;
  brojSoba: string = null;

  allListings: Listing[];
  listingsForDisplay: Listing[] = new Array();

  prosecnaCena: Number;

  currentPage: number = 1;

  constructor(private listingService: ListingService, private cityService: CityService, private stateService: StateService, private microlocationService: MicrolocationService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Kupac") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
    this.listingService.getAllListingsLimited(this.currentPage).subscribe((data: Listing[]) => {
      this.listingsForDisplay = data;
      for (let i = 0; i < this.listingsForDisplay.length; i++) {
        let names = this.listingsForDisplay[i].imagesNames.split(",");
        // -2 zato sto postoji poslednji prazan string odvojen zarezom
        let index = this.getRandomNumberBetween(0, names.length - 2)
        this.listingsForDisplay[i].imagesNames = "../../assets/images/" + names[index];
      }
    });
    this.cityService.getAllCities().subscribe((data: City[]) => {
      this.cities = data;
    })
    this.stateService.getAllStates().subscribe((data: State[]) => {
      this.states = data;
    })
    this.microlocationService.getAllMicrolocations().subscribe((data: Microlocation[]) => {
      this.microlocations = data;
    })
  }

  getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  pretrazi() {
    let ret = false;
    if (this.typeFormControl.hasError('required')) {
      this.typeFormControl.markAllAsTouched();
      ret = true;
    }
    if (ret == true) return;
    console.log(this.tip, this.grad, this.opstina, this.mikrolokacija, this.cenaDo, this.kvadraturaOd, this.brojSoba)
    this.listingService.filterListings(this.tip, this.grad, this.opstina, this.mikrolokacija, this.cenaDo, this.kvadraturaOd, this.brojSoba, this.currentPage).subscribe((data: Listing[]) => {
      this.listingsForDisplay = data
      for (let i = 0; i < this.listingsForDisplay.length; i++) {
        let names = this.listingsForDisplay[i].imagesNames.split(",");
        // -2 zato sto postoji poslednji prazan string odvojen zarezom
        let index = this.getRandomNumberBetween(0, names.length - 2)
        this.listingsForDisplay[i].imagesNames = "../../assets/images/" + names[index];
      }
    })

  }

  izracinajProsecnuCenu() {
    let sum: any = 0;
    for (let listing of this.allListings) {
      sum += listing.cena;
    }
    console.log(sum);
    this.prosecnaCena = sum / this.allListings.length;
  }

  pageInc() {
    if (this.listingsForDisplay.length < 5) return;
    this.currentPage++;
    if (this.tip != null) {
      this.pretrazi();
    }
    else {
      this.listingService.getAllListingsLimited(this.currentPage).subscribe((data: Listing[]) => {
        this.listingsForDisplay = data;
        for (let i = 0; i < this.listingsForDisplay.length; i++) {
          let names = this.listingsForDisplay[i].imagesNames.split(",");
          // -2 zato sto postoji poslednji prazan string odvojen zarezom
          let index = this.getRandomNumberBetween(0, names.length - 2)
          this.listingsForDisplay[i].imagesNames = "../../assets/images/" + names[index];
        }
      });
    }
  }

  pageDec() {
    if (this.currentPage == 1) return;
    this.currentPage--;
    if (this.tip != null) {
      this.pretrazi();
    }
    else {
      this.listingService.getAllListingsLimited(this.currentPage).subscribe((data: Listing[]) => {
        this.listingsForDisplay = data;
        for (let i = 0; i < this.listingsForDisplay.length; i++) {
          let names = this.listingsForDisplay[i].imagesNames.split(",");
          // -2 zato sto postoji poslednji prazan string odvojen zarezom
          let index = this.getRandomNumberBetween(0, names.length - 2)
          this.listingsForDisplay[i].imagesNames = "../../assets/images/" + names[index];
        }
      });
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
    if (this.grad == null) {
      this.microlocationService.getAllMicrolocationsForState2(this.opstina).subscribe((data: Microlocation[]) => {
        this.microlocations = data;
      })
      this.stateService.getStateName(this.opstina).subscribe((data: State) => {
        let state = data;
        this.cityService.getCity(state[0].city).subscribe((data: City[]) => {
          this.cities = data;
        })
      })
    }
    else {
      this.microlocationService.getAllMicrolocationsForState(this.grad, this.opstina).subscribe((data: Microlocation[]) => {
        this.microlocations = data;
      })
    }
  }

  onMicrolocationSelected(event) {
    if (this.opstina == null) {
      this.microlocationService.getMicrolocationName(this.mikrolokacija).subscribe((data: Microlocation) => {
        let microlocation = data;
        console.log(microlocation)
        this.stateService.getStateName(microlocation[0].state).subscribe((data: State[]) => {
          console.log(data)
          let state = data;
          this.states = state;
          this.cityService.getCity(state[0].city).subscribe((data: City[]) => {
            this.cities = data;
          })
        })
      })
    }
  }
}
