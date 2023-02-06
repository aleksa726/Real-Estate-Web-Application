import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  passwordFormControl = new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$")]);
  newPasswordFormControl = new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$")]);
  newPasswordConfirmFormControl = new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$")]);

  oldPassword: String;
  newPassword: String;
  newPasswordConfirm: String;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  changePassword() {
    if (this.newPassword == this.newPasswordConfirm) {
      let ret = false;
      if (this.passwordFormControl.hasError('required')) {
        this.passwordFormControl.markAllAsTouched();
        ret = true;
      }
      if (this.newPasswordFormControl.hasError('required')) {
        this.newPasswordFormControl.markAllAsTouched();
        ret = true;
      }
      if (this.newPasswordConfirmFormControl.hasError('required')) {
        this.newPasswordConfirmFormControl.markAllAsTouched();
        ret = true;
      }
      if (ret == false) {
        this.userService.changePassword(sessionStorage.getItem('username'), this.oldPassword, this.newPassword).subscribe(resp => {
          alert(resp['message'])
          sessionStorage.removeItem("username");
          this.router.navigate(['']);
        })
      }
    }
    else {
      alert('Lozinke se ne poklapaju');
      location.reload();
    }
  }
}
