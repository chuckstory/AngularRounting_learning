import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isLoggedIn: Subject<boolean>;

  constructor(private authService: AuthService){

  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
