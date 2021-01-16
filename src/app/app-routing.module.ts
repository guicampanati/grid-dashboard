import { NgModule } from '@angular/core';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
  customClaims,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const redirectLoggedInToProfile = (user) =>
  redirectLoggedInTo(['profile', user.uid]);

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const adminOnly = () =>
  pipe(
    customClaims,
    map((claims) => claims.admin === true || [''])
  );

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
  {
    path: 'users',
    component: UsersComponent,
    ...canActivate(adminOnly),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
