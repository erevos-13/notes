import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import * as firebase from "firebase";

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  messaging = firebase.messaging();
  constructor(private angularFireMessaging: AngularFireMessaging) {


    // @ts-ignore
    this.angularFireMessaging.messages.subscribe((msn) => {
      console.log(msn)
    }, err => {
      console.log(err)
    })
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
      });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (msg) => {
        console.log("show message!", msg);
        this.currentMessage.next(msg);
      })
  }
}
