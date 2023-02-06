import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingService } from '../listing.service';
import { Listing } from '../models/listing';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  listing: Listing;

  microlocationListings: Listing[];

  path: String = "../../";

  prosecnaCena: Number;
  cenaPoKvadratuNekretnine: Number;

  showPhone: boolean = false;

  imagePaths: String[] = null;
  showPicture: boolean[] = null;

  user: User;

  constructor(private listingService: ListingService, private userService: UserService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(parameterMap => {
      const urlNaslov = parameterMap.get('naslov');
      this.listingService.getListing(urlNaslov).subscribe((data: Listing) => {
        this.listing = data;
        this.cenaPoKvadratuNekretnine = (this.listing.cena as number) / (this.listing.kvadrata as number);
        this.listingService.getAllListingsFromMicrolocation(this.listing.mikrolokacija).subscribe((data: Listing[]) => {
          this.microlocationListings = data;
          this.izracinajProsecnuCenu();
        })

        this.userService.getUser(sessionStorage.getItem("username")).subscribe((data: User) => {
          this.user = data;
        })


        let names = this.listing.imagesNames.split(",");
        this.imagePaths = new Array(names.length - 1);
        this.showPicture = new Array(names.length - 1);
        for (let i = 0; i < names.length - 1; i++) {
          this.imagePaths[i] = "../../assets/images/" + names[i];
          if (i == 0) {
            this.showPicture[i] = true;
          }
          else {
            this.showPicture[i] = false;
          }
        }

      })
    })


  }

  izracinajProsecnuCenu() {
    let sum: any = 0;
    let povrsina: any = 0;
    for (let listing of this.microlocationListings) {
      sum += listing.cena;
      povrsina += listing.kvadrata;
    }
    this.prosecnaCena = Math.floor(sum / povrsina);
  }

  prikaziTelefon() {
    this.showPhone = true;
  }

  setShowPicture(imagePath) {
    for (let i = 0; i < this.imagePaths.length; i++) {
      if (imagePath == this.imagePaths[i]) {
        this.showPicture[i] = true;
      }
      else {
        this.showPicture[i] = false;
      }
    }
  }

  dodajOmiljene(listing) {
    if (this.user.favouriteListings != null) {
      if (this.user.favouriteListings.length >= 5) {
        alert("Imate maksimalan broj omiljenih oglasa!")
        return;
      }
      for (let i = 0; i < this.user.favouriteListings.length; i++) {
        if (listing.naslov === this.user.favouriteListings[i].naslov) {
          alert("Izabrani oglas je vec dodat u omiljene!");
          return;
        }
      }
    }
    this.userService.addFavourite(listing, this.user.username).subscribe((resp) => {
      alert(resp['message'])
    })
  }

}
