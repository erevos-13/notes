import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {MatButtonModule} from '@angular/material/button';
import {NavBarModule} from '../../components/nav-bar/nav-bar.module';
import {InfoMessageModule} from '../../components/info-message/info-message.module';
import {NgxLoadingModule} from 'ngx-loading';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NavBarModule,
    InfoMessageModule,
    NgxLoadingModule
  ],
  providers: [
    AuthService,
  ]
})
export class LoginModule { }
