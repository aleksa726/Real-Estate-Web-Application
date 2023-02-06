import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  username: String;
  type: String;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");
    this.getUser(this.username);
  }


  logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("type");
  }

  getUser(username) {
    let user: User;
    this.userService.getUser(username).subscribe((data: User) => {
      user = data;
      if (user != null) {
        this.type = user.type;
      }
    })
  }
}
