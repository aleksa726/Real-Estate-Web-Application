import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgencyService } from '../agency.service';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

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

  allAgencies: Agency[];

  agentString: String = "Agent";

  firstname: string;
  lastname: string;
  username: string;
  password: string;
  passwordConfirm: string;
  city: string;
  birthday: Date;
  phone: string;
  email: string;
  agency: string;
  licence: number;
  type: String;

  constructor(private userService: UserService, private agencyService: AgencyService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Admin") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
    this.agencyService.getAllAgencies().subscribe((data: Agency[]) => {
      this.allAgencies = data;
    })
  }

  register() {
    let ret = false;
    if (this.usernameFormControl.hasError('required')) {
      this.usernameFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.passwordFormControl.hasError('required')) {
      this.passwordFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.firstnameFormControl.hasError('required')) {
      this.firstnameFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.lastnameFormControl.hasError('required')) {
      this.lastnameFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.passwordConfirmFormControl.hasError('required')) {
      this.passwordConfirmFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.cityFormControl.hasError('required')) {
      this.cityFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.birthdayFormControl.hasError('required')) {
      this.birthdayFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.phoneFormControl.hasError('required')) {
      this.phoneFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.emailFormControl.hasError('required')) {
      this.emailFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.type == "Agent") {
      if (this.agencyFormControl.hasError('required')) {
        this.agencyFormControl.markAllAsTouched();
        ret = true;
      }
      if (this.licenceFormControl.hasError('required')) {
        this.licenceFormControl.markAllAsTouched();
        ret = true;
      }
    }
    if (this.typeFormControl.hasError('required')) {
      this.typeFormControl.markAllAsTouched();
      ret = true;
    }
    if (ret == false) {
      this.userService.checkUsername(this.username).subscribe((userUsername: User) => {
        if (userUsername) {
          alert("Korisnicko ime je zauzeto")
          return
        }
        else {

          this.userService.checkEmail(this.email).subscribe((userEmail: User) => {
            if (userEmail) {
              alert("Email je zauzet")
              return
            }
            else {
              this.userService.registerUser(this.firstname, this.lastname, this.username,
                this.password, this.passwordConfirm, this.city, this.birthday,
                this.phone, this.email, this.agency, this.licence, this.type, 1).subscribe((resp) => {
                  alert(resp['message'])
                })
            }
          })
        }

      })
    }
  }
}
