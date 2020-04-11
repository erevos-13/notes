import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';


const routes: Routes = [{ path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) }, { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canActivate: [AngularFireAuthGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
