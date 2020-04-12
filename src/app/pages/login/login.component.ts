import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {INotes} from '../../services/collections.service';
import {InfoPopupComponent} from '../../components/info-popup/info-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {IInfoPopUpMessage, InfoMessageComponent} from '../../components/info-message/info-message.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  loadingRegister = false;
  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router,
    private auth: AngularFireAuth,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['erevos13@gmail.com', [Validators.required]],
      password: ['1qaz2wsx', [Validators.required]]
    });
  }

  async onLogin() {
    try {
      this.loading = true;
      const login: any = await  this.authSrv.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
      this.loading = false;
      console.log(login);
      if (!login.emailVerified) {
       try {
         this.loading = false;
         this.openDialog('Info', 'Please check your email to confirm your account.');
         return ;
       }catch (e) {
         return ;
       }

      }
      this.loading = false;
      this.router.navigate(['/home']);

    } catch (e) {
      this.loading = false;
      console.log(e);
      this.openDialog('Error', e.message);
    }
  }

  onRegister() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loadingRegister = true;
    this.auth.createUserWithEmailAndPassword(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then(async (user) => {
        console.log(user);
        if (!user.user.emailVerified) {
         try {
           await user.user.sendEmailVerification();
           this.loadingRegister = false;
           this.openDialog('Info', 'Please check your email to confirm your account.');
           return ;
         }catch (e) {
           return;
         }
        }
        this.loadingRegister = false;
        this.router.navigate(['/home']);
      })
      .catch((err) => {
        console.log(err);
        this.loadingRegister = false;
        this.openDialog('Error', err.message);
      });
  }


  openDialog(title: string, message: string): void {
    const input: IInfoPopUpMessage = {
      title: title,
      message: message
    };
    const dialogRef = this.dialog.open(InfoMessageComponent, {
      data: input
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
