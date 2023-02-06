import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListingService } from '../listing.service';
import { Listing } from '../models/listing';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  username: string;
  password: string;

  message: string;

  listings: Listing[];

  constructor(private userService: UserService, private router: Router, private listingService: ListingService) { }

  ngOnInit(): void {
    sessionStorage.removeItem("username");
    this.listingService.getAllListings().subscribe((data: Listing[]) => {
      this.listings = data;
      if (this.listings.length > 5) {
        this.listings.splice(0, this.listings.length - 5);
      }
      for (let i = 0; i < this.listings.length; i++) {
        let names = this.listings[i].imagesNames.split(",");
        // -2 zato sto postoji poslednji prazan string odvojen zarezom
        let index = this.getRandomNumberBetween(0, names.length - 2)
        this.listings[i].imagesNames = "../../assets/images/" + names[index];
      }
    })
  }

  getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  login() {
    let ret = false;
    if (this.usernameFormControl.hasError('required')) {
      this.usernameFormControl.markAllAsTouched();
      ret = true;
    }
    if (this.passwordFormControl.hasError('required')) {
      this.passwordFormControl.markAllAsTouched();
      ret = true;
    }
    if (ret == false) {
      this.userService.login(this.username, this.password).subscribe((user: User) => {
        if (user) {
          if (user.pending == 0 || user.type == "Admin") {
            sessionStorage.setItem("username", user.username);
            sessionStorage.setItem("type", user.type as string)
            if (user.type == "Kupac") {
              this.router.navigate(['/user/home']);
            }
            else if (user.type == "Prodavac") {
              this.router.navigate(['/seller/home']);
            }
            else if (user.type == "Agent") {
              this.router.navigate(['/seller/home']);
            }
            else {
              this.router.navigate(['/admin/users']);
            }
          }
        }
        else this.message = "Nepostojeci korisnik";
      })

    }
  }

}
