import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-korisnik',
  templateUrl: './admin-korisnik.component.html',
  styleUrls: ['./admin-korisnik.component.css']
})
export class AdminKorisnikComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Admin") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
  }

}
