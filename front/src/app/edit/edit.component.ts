import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AgencyService } from '../agency.service';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  usernameFormControl = new FormControl('', [Validators.required]);
  passwordConfirmFormControl = new FormControl('', [Validators.required]);
  firstnameFormControl = new FormControl('', [Validators.required]);
  lastnameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$")]);
  cityFormControl = new FormControl('', [Validators.required]);
  birthdayFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  agencyFormControl = new FormControl('', [Validators.required]);
  licenceFormControl = new FormControl('', [Validators.required]);
  typeFormControl = new FormControl('', [Validators.required]);

  agentString: String = "Agent";

  allAgencies: Agency[];

  user: User;

  ime: string;
  prezime: string;
  korisnickoIme: string;
  lozinka: string;
  grad: string;
  datum: Date;
  telefon: string;
  emailAdresa: string;
  agencija: string;
  licenca: number;
  tip: String;

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  city: string;
  birthday: Date;
  phone: string;
  email: string;
  agency: string;
  licence: number;
  type: String;


  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private agencyService: AgencyService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Admin") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
    this.activatedRoute.paramMap.subscribe(parameterMap => {
      const username = parameterMap.get('username');

      this.getUser(username);
    })

    this.agencyService.getAllAgencies().subscribe((data: Agency[]) => {
      this.allAgencies = data;
    })
  }

  getUser(username) {
    this.userService.getUser(username).subscribe((data: User) => {
      this.user = data;
      this.ime = this.user.firstname;

      this.prezime = this.user.lastname;
      this.korisnickoIme = this.user.username;
      this.lozinka = this.user.password;
      this.grad = this.user.city;
      this.datum = this.user.birthday;
      this.telefon = this.user.phone;
      this.emailAdresa = this.user.email;
      this.agencija = this.user.agency;
      this.licenca = this.user.licence;
      this.tip = this.user.type;

      this.firstname = this.ime;
      this.lastname = this.prezime
      this.username = this.korisnickoIme
      this.password = this.lozinka
      this.city = this.grad
      this.birthday = this.datum
      this.phone = this.telefon
      this.email = this.emailAdresa
      this.agency = this.agencija
      this.licence = this.licenca
      this.type = this.tip
    })
  }

  updateUser() {
    this.userService.updateUser(this.firstname, this.lastname, this.username,
      this.password, this.city, this.birthday,
      this.phone, this.email, this.agency, this.licence, this.type).subscribe((resp) => {
        alert(resp['message'])
        this.router.navigate(['/admin/viewUsers']);
      })
  }

}
