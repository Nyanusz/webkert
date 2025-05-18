import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './shared/guards/auth.guard';
import {PlaylistComponent} from './pages/playlist/playlist.component';
import {AuthGuard} from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'upload',
    loadComponent: () => import('./pages/upload/upload.component').then(m => m.UploadComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [publicGuard]
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent),
    canActivate: [publicGuard]

  },


  { path: 'playlist',
    loadComponent: () => import('./pages/playlist/playlist.component').then(m => m.PlaylistComponent),
    canActivate: [AuthGuard]
  },


  {
    path: 'zene/:id',
    loadComponent: () => import('./pages/zeneinfo/zeneinfo.component').then(m => m.ZeneinfoComponent)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];
