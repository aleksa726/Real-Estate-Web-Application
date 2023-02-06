import { Component, Input, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { Listing } from '../models/listing';

@Component({
  selector: 'app-listing-preview',
  templateUrl: './listing-preview.component.html',
  styleUrls: ['./listing-preview.component.css']
})
export class ListingPreviewComponent implements OnInit {

  @Input() listing: Listing;

  microlocationListings: Listing[];

  prosecnaCena: Number;

  constructor(private listingService: ListingService) { }

  ngOnInit(): void {
    this.listingService.getAllListingsFromMicrolocation(this.listing.mikrolokacija).subscribe((data: Listing[]) => {
      this.microlocationListings = data;
      this.izracinajProsecnuCenu();
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
}
