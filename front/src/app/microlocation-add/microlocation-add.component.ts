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
  selector: 'app-microlocation-add',
  templateUrl: './microlocation-add.component.html',
  styleUrls: ['./microlocation-add.component.css']
})
export class MicrolocationAddComponent implements OnInit {

  gradFormControl = new FormControl('', [Validators.required]);
  opstinaFormControl = new FormControl('', [Validators.required]);
  mikrolokacijaFormControl = new FormControl('', [Validators.required]);
  mikrolokacijaUliceFormControl = new FormControl('', [Validators.required]);
  ulicaFormControl = new FormControl('', [Validators.required]);
  mikrolokacijaBrisanjeFormControl = new FormControl('', [Validators.required]);

  cities: City[];
  states: State[];

  grad: String;
  opstina: String;
  mikrolokacija: String;

  mikrolokacijaBrisanje: String;

  mikrolokacijaUlice: String;
  ulica: String;

  allMicrolocations: Microlocation[];

  constructor(private cityService: CityService, private stateService: StateService, private microlocationService: MicrolocationService, private listingService: ListingService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Admin") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
    this.cityService.getAllCities().subscribe((data: City[]) => {
      this.cities = data;
    })

    this.microlocationService.getAllMicrolocations().subscribe((data: Microlocation[]) => {
      this.allMicrolocations = data;
    })

  }

  onCitySelected(event) {
    this.stateService.getAllStatesForCity(this.grad).subscribe((data: State[]) => {
      this.states = data;
    })
  }

  dodajMikrolokaciju() {
    let ret = false;
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
    if (ret == false) {
      this.microlocationService.checkMicrolocation(this.grad, this.opstina, this.mikrolokacija).subscribe((microlocationCheck: Microlocation) => {
        if (microlocationCheck) {
          alert("Izabrana mikrolokacija vec postoji")
          return
        }
        else {
          if (this.mikrolokacija == "Centar") {
            this.mikrolokacija = this.mikrolokacija + " (" + this.grad + ")";
          }
          this.microlocationService.addMicrolocation(this.grad, this.opstina, this.mikrolokacija).subscribe((resp) => {
            alert(resp['message']);
            location.reload()
          })
        }
      })
    }
  }

  dodajUlicu() {
    let ret = false;
    if (this.mikrolokacijaUliceFormControl.hasError('required')) {
      this.mikrolokacijaUliceFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.ulicaFormControl.hasError('required')) {
      this.ulicaFormControl.markAllAsTouched();
      ret = true;
    }
    if (ret == false) {
      let street = {
        "name": this.ulica
      }
      console.log(this.mikrolokacijaUlice)
      this.microlocationService.addStreet(this.mikrolokacijaUlice, street).subscribe((resp) => {
        alert(resp['message'])
        location.reload()
      })
    }
  }

  obrisiMikrolokaciju() {
    let ret = false;
    if (this.mikrolokacijaBrisanjeFormControl.hasError('required')) {
      this.mikrolokacijaBrisanjeFormControl.markAllAsTouched();
      ret = true;
    }
    if (ret == false) {
      this.listingService.getAllListingsFromMicrolocation(this.mikrolokacijaBrisanje).subscribe((listings: Listing[]) => {
        if (listings.length != 0) {
          alert("Postoje oglasi na zadatoj mikrolokaciji")
        }
        else {
          this.microlocationService.deleteMicrolocation(this.mikrolokacijaBrisanje).subscribe((resp) => {
            alert(resp['message'])
            location.reload()
          })
        }
      })
    }
  }
}
