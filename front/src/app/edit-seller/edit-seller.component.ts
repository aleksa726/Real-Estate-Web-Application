import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgencyService } from '../agency.service';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-seller',
  templateUrl: './edit-seller.component.html',
  styleUrls: ['./edit-seller.component.css']
})
export class EditSellerComponent implements OnInit {

  phoneFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  agencyFormControl = new FormControl('', [Validators.required]);
  typeFormControl = new FormControl('', [Validators.required]);

  user: User;

  agentString: String = "Agent";

  allAgencies: Agency[];

  phone: String;
  email: String;
  type: String;
  agency: String;

  telefon: String;
  emailAdresa: String;
  tip: String;
  agencija: String;

  constructor(private agencyService: AgencyService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Prodavac" && sessionStorage.getItem("type") != "Agent") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
    this.agencyService.getAllAgencies().subscribe((data: Agency[]) => {
      this.allAgencies = data;
    })
    this.getUser(sessionStorage.getItem("username"));
  }

  getUser(username) {
    this.userService.getUser(username).subscribe((data: User) => {
      this.user = data;

      this.telefon = this.user.phone;
      this.emailAdresa = this.user.email;
      this.agencija = this.user.agency;
      this.tip = this.user.type;

      this.phone = this.telefon;
      this.email = this.email;
      this.type = this.tip;
      this.agency = this.agencija;
    })
  }

  updateUser() {
    let ret = false;
    if (this.phoneFormControl.hasError('required')) {
      this.phoneFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.emailFormControl.hasError('required')) {
      this.emailFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.agencyFormControl.hasError('required')) {
      this.agencyFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.typeFormControl.hasError('required')) {
      this.typeFormControl.markAllAsTouched();
      ret = true;
    }
    if (ret == false) {
      if (this.type == "Prodavac") {
        this.agency = "";
      }
      this.userService.updateSeller(sessionStorage.getItem("username"),
        this.phone, this.email, this.agency, this.type).subscribe((resp) => {
          alert(resp['message'])
        })
    }
  }

}
