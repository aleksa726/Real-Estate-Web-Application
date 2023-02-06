import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from '../listing.service';
import { Listing } from '../models/listing';

@Component({
  selector: 'app-prodavac-pocetna',
  templateUrl: './prodavac-pocetna.component.html',
  styleUrls: ['./prodavac-pocetna.component.css']
})
export class ProdavacPocetnaComponent implements OnInit {

  myListings: Listing[];

  constructor(private listingService: ListingService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Prodavac" && sessionStorage.getItem("type") != "Agent") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
    this.listingService.getUserListings(sessionStorage.getItem("username")).subscribe((data: Listing[]) => {
      this.myListings = data;
    })
  }

  prodaj(listing) {
    this.listingService.sell(listing.naslov).subscribe(resp => {
      alert(resp['message'])
      location.reload();
    })
  }

  updateListing(naslov) {
    this.router.navigate(['seller/editListing', naslov]);
  }
}
