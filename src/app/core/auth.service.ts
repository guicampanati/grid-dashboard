import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { UserProfile } from './user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User | null>;
  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.user = auth.authState;
  }

  async logout(): Promise<void> {
    await this.auth.signOut().then(() => this.router.navigate(['']));
  }

  async createUserDocument(): Promise<void> {
    await this.auth.currentUser.then((res) => {
      const userProfile: UserProfile = {
        uid: res.uid,
        email: res.email,
        name: res.displayName,
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        specialty: '',
        ip: '',
      };
      this.afs.doc(`users/${userProfile.uid}`).set(userProfile);
    });
  }

  async updateUserDocument(userProfile: UserProfile): Promise<void> {
    return await this.afs.doc(`users/${userProfile.uid}`).update(userProfile);
  }

  async routeOnLogin(uid: string): Promise<void> {
    const token = await (await this.auth.currentUser).getIdTokenResult();

    if (token.claims.admin) {
      this.router.navigate(['/users']);
    } else {
      this.router.navigate([`/profile/${uid}`]);
    }
  }
}
