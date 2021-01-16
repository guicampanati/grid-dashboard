import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  canActivate,
  customClaims,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const adminOnly = () =>
  pipe(
    customClaims,
    map((claims) => claims.admin === true || [''])
  );

const redirectLoggedInToProfileOrUsers = () =>
  pipe(
    customClaims,
    map((claims) => {
      // if no claims, there is no authenticated users
      if (claims.length === 0) {
        return true;
      }
      // if admin custom claim
      if (claims.admin) {
        return ['users'];
      }
      // if regular user
      return ['profile', claims.user_id];
    })
  );

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfileOrUsers },
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
