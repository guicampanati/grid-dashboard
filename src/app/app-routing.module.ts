import { NgModule } from '@angular/core';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const redirectLoggedInToProfile = (user) =>
  redirectLoggedInTo(['profile', user.uid]);

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToProfile),
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
