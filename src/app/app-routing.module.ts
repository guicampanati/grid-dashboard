import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () =>
        map((user) => (user ? ['profile', (user as any).uid] : true)),
    },
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: (next) =>
        map((user) => (!!user && next.params.id === (user as any).uid) || ['']),
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
