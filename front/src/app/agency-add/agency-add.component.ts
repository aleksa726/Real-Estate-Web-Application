import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgencyService } from '../agency.service';
import { Agency } from '../models/agency';

@Component({
  selector: 'app-agency-add',
  templateUrl: './agency-add.component.html',
  styleUrls: ['./agency-add.component.css']
})
export class AgencyAddComponent implements OnInit {

  agencyNameFormControl = new FormControl('', [Validators.required]);
  agencyAdressFormControl = new FormControl('', [Validators.required]);
  agencyCityFormControl = new FormControl('', [Validators.required]);
  agencyPhoneFormControl = new FormControl('', [Validators.required]);
  pibFormControl = new FormControl('', [Validators.required]);

  agencyName: string;
  agencyAdress: string;
  agencyCity: string;
  agencyPhone: string;
  pib: String;

  constructor(private agencyService: AgencyService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Admin") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
  }

  registerAgency() {
    let ret = false;
    if (this.agencyNameFormControl.hasError('required')) {
      this.agencyNameFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.agencyAdressFormControl.hasError('required')) {
      this.agencyAdressFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.agencyCityFormControl.hasError('required')) {
      this.agencyCityFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.agencyPhoneFormControl.hasError('required')) {
      this.agencyPhoneFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.pibFormControl.hasError('required')) {
      this.pibFormControl.markAllAsTouched();
      ret = true;
    }
    if (ret == false) {
      this.agencyService.checkAgency(this.agencyName).subscribe((agencyCheck: Agency) => {
        if (agencyCheck) {
          alert("Agencija sa izabranim nazivom vec postoji")
          return
        }
        else {
          this.agencyService.registerAgency(this.agencyName, this.agencyAdress,
            this.agencyCity, this.agencyPhone, this.pib).subscribe((resp) => {
              if (resp['message'] == 'agency added') {
                alert("Agencija je uspesno dodata")
              } else {
                alert("ERROR")
              }
              location.reload()
            })
        }

      })

    }
  }
}
