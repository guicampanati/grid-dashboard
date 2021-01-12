import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  action: 'login' | 'signup' = 'login';
  error: string;
  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}

  get isLogin(): boolean {
    return this.action === 'login';
  }

  get isSignUp(): boolean {
    return this.action === 'signup';
  }

  async onSubmit(loginForm: NgForm): Promise<void> {
    this.loading = true;
    this.error = '';
    const { firstName, lastName, email, password } = loginForm.value;

    let res;
    try {
      if (this.isSignUp) {
        res = await this.auth.createUserWithEmailAndPassword(email, password);
        await res.user.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });
        loginForm.reset();
      } else {
        res = await this.auth.signInWithEmailAndPassword(email, password);
      }

      const uid = res.user.uid;
      this.router.navigate([`/profile/${uid}`]);
    } catch (err) {
      this.error = err.message;
    }
    this.loading = false;
  }
}
