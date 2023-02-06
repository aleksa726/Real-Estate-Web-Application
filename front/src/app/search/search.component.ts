import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingService } from '../listing.service';
import { Listing } from '../models/listing';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  kvadraturaDo: number = null;
  kvadraturaOd: number = null;
  cenaDo: number = null;
  cenaOd: number = null;
  sobaOd: number = null;
  sobaDo: number = null;
  godinaOd: number = null;
  godinaDo: number = null;
  agencija: boolean = null;
  vlasnik: boolean = null;
  stanje: string = null;
  grejanje: string = null;
  spratOd: number = null;
  spratDo: number = null;
  rezijeOd: number = null;
  rezijeDo: number = null;
  terasa: boolean = false;
  lodja: boolean = false;
  balkon: boolean = false;
  lift: boolean = false;
  podrum: boolean = false;
  garaza: boolean = false;
  basta: boolean = false;
  klima: boolean = false;
  internet: boolean = false;
  interfon: boolean = false;
  telefon: boolean = false;

  currentPage: number = 1;

  allListings: Listing[];
  listingsForDisplay: Listing[] = new Array();

  prosecnaCena: Number;

  constructor(private listingService: ListingService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Kupac") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
  }

  pretrazi() {
    this.listingService.filterListingsAdvanced(
      this.kvadraturaDo,
      this.kvadraturaOd,
      this.cenaDo,
      this.cenaOd,
      this.sobaOd,
      this.sobaDo,
      this.godinaOd,
      this.godinaDo,
      this.agencija,
      this.vlasnik,
      this.stanje,
      this.grejanje,
      this.spratOd,
      this.spratDo,
      this.rezijeOd,
      this.rezijeDo,
      this.terasa,
      this.lodja,
      this.balkon,
      this.lift,
      this.podrum,
      this.garaza,
      this.basta,
      this.klima,
      this.internet,
      this.interfon,
      this.telefon,
      this.currentPage
    ).subscribe((data: Listing[]) => {
      this.listingsForDisplay = data
      for (let i = 0; i < this.listingsForDisplay.length; i++) {
        let names = this.listingsForDisplay[i].imagesNames.split(",");
        // -2 zato sto postoji poslednji prazan string odvojen zarezom
        let index = this.getRandomNumberBetween(0, names.length - 2)
        this.listingsForDisplay[i].imagesNames = "../../assets/images/" + names[index];
      }
    })
  }

  getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  pageInc() {
    if (this.listingsForDisplay.length < 5) return;
    this.currentPage++;
    this.pretrazi();
  }

  pageDec() {
    if (this.currentPage == 1) return;
    this.currentPage--;
    this.pretrazi();
  }

  getListingsForDisplay() {
    this.listingsForDisplay = new Array();
    for (let i = 0; i < this.allListings.length; i++) {
      if ((i + 1) <= this.currentPage * 10 && (i + 1) > (this.currentPage - 1) * 10) {
        this.listingsForDisplay.push(this.allListings[i]);
      }
    }
  }

}
