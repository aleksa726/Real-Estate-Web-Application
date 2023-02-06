import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AgencyService } from '../agency.service';
import { Agency } from '../models/agency';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


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

  imageNotSelectedError: String = "";

  agentString: String = "Agent";

  allAgencies: Agency[];

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



  selectedFile = null;

  captcha: string;

  constructor(private userService: UserService, private agencyService: AgencyService) {
    this.captcha = '';
  }

  ngOnInit(): void {
    sessionStorage.removeItem("username");

    this.agencyService.getAllAgencies().subscribe((data: Agency[]) => {
      this.allAgencies = data;
      //this.news.sort(); OK
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
    if (this.selectedFile == null) {
      this.imageNotSelectedError = "Slika nije izabrana"
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
                this.phone, this.email, this.agency, this.licence, this.type, 1, this.selectedFile, this.selectedFile.name).subscribe((resp) => {
                  alert(resp['message'])
                })
              location.reload();
            }
          })
        }

      })
    }
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log('resolved captcha with response: ' + this.captcha);
  }

  onFileSelected(event) {

    if (event.target.files[0].type == "image/png" || event.target.files[0].type == "image/jpeg") {

      const max_height = 300;
      const max_width = 300;
      const min_height = 100;
      const min_width = 100;

      const reader = new FileReader();

      reader.onload = (e: any) => {

        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height <= max_height && img_width <= max_width && img_width >= min_width && img_height >= min_height) {
            this.selectedFile = <File>event.target.files[0];
          } else {
            this.imageNotSelectedError = "Izabrana slika nije odgovarajucih dimenzija";
          }

        };
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
