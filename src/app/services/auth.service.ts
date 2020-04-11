import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authSrv: AngularFireAuth
  ) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authSrv.signInWithEmailAndPassword(email, password)
        .then((userAuthCredential) => {
          resolve(userAuthCredential.user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
