import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  async onSubmit(loginForm: NgForm) {
    this.loading = true;
    const { firstName, lastName, email, password } = loginForm.value;

    try {
      const res = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await res.user.updateProfile({ displayName: `${firstName} ${lastName}` });
      loginForm.reset();
    } catch (err) {
      console.log(err.message);
    }
    this.loading = false;
  }
}
