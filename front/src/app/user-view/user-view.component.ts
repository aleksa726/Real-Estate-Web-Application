import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  allUsers: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("type") != "Admin") {
      sessionStorage.removeItem("type")
      this.router.navigate(['']);
    }
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.allUsers = data;
    })
  }

  updateUser(username) {
    this.router.navigate(['admin/edit', username]);
  }

  declineUser(username) {
    this.userService.declineUser(username).subscribe(resp => {
      alert(resp['message'])
      this.userService.getAllUsers().subscribe((data: User[]) => {
        this.allUsers = data;
      })
    })
  }

}
