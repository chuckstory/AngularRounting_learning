import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  loggedIn = new Subject<boolean>();

  constructor() { }

  isLoggedIn(): Subject<boolean> {
    return this.loggedIn;
  }

  login() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
  }

}
