import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User | null>;
  constructor(private router: Router, private auth: AngularFireAuth) {
    this.user = auth.authState;
  }

  logout(): void {
    this.auth.signOut();
    this.router.navigate(['']);
  }
}
