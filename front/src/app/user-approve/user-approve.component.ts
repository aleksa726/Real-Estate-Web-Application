import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-approve',
  templateUrl: './user-approve.component.html',
  styleUrls: ['./user-approve.component.css']
})
export class UserApproveComponent implements OnInit {

  pendingUsers: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Admin") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
    this.userService.getAllPendingUsers().subscribe((data: User[]) => {
      this.pendingUsers = data;
    })
  }

  acceptUser(username) {
    this.userService.acceptUser(username).subscribe(resp => {
      alert(resp['message'])
      this.userService.getAllPendingUsers().subscribe((data: User[]) => {
        this.pendingUsers = data;
      })
    })
  }

  declineUser(username) {
    this.userService.declineUser(username).subscribe(resp => {
      if (resp['message'] == "Korisnik je obrisan") {
        alert('Korisnik je odbijen')
        this.userService.getAllPendingUsers().subscribe((data: User[]) => {
          this.pendingUsers = data;
        })
      }
    })
  }

}
