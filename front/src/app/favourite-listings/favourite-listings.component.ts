import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from '../listing.service';
import { Listing } from '../models/listing';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-favourite-listings',
  templateUrl: './favourite-listings.component.html',
  styleUrls: ['./favourite-listings.component.css']
})
export class FavouriteListingsComponent implements OnInit {

  user: User;
  favouriteListings: any;

  constructor(private listingService: ListingService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Kupac") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
    this.userService.getUser(sessionStorage.getItem("username")).subscribe((data: User) => {
      this.user = data;
      console.log(this.user)
      this.favouriteListings = this.user.favouriteListings;
      console.log(this.favouriteListings)
      for (let i = 0; i < this.favouriteListings.length; i++) {
        let names = this.favouriteListings[i].imagesNames.split(",");
        // -2 zato sto postoji poslednji prazan string odvojen zarezom
        let index = this.getRandomNumberBetween(0, names.length - 2)
        this.favouriteListings[i].imagesNames = "../../assets/images/" + names[index];
      }
    })
  }

  getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  removeFromFavourite(listing) {
    this.userService.removeFavourite(listing, this.user.username).subscribe((resp) => {
      alert(resp['message'])
    })
    location.reload()
  }

}
