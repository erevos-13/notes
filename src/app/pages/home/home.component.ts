import { Component, OnInit } from '@angular/core';
import {CollectionsService, INotes} from '../../services/collections.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {InfoPopupComponent} from '../../components/info-popup/info-popup.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {MessagingService} from '../../services/messaging.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title: string;
  note: string;
  userNotes: Observable<any[]>;
  message;
  constructor(
    private collectionsSrv: CollectionsService,
    public dialog: MatDialog,
    public auth: AngularFireAuth,
    private router: Router,
    private messagingService: MessagingService
  ) { }

  ngOnInit(): void {
    const userId = 'user001';
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    this.userNotes = this.collectionsSrv.getNotesOfUser();
    console.log('home', this.message);
  }

  addNotes() {
    if (!this.note || !this.title) {
      return;
    }
    const input: INotes = {
      title: this.title,
      note: this.note
    };
    this.collectionsSrv.addNotes(input).then().catch();
  }

  selectNote(note: INotes) {
    console.log(note);
    this.openDialog(note);
    // this.collectionsSrv.getNoteById(note)
    //   .then((noteSelected: INotes) => {
    //     console.log(noteSelected);
    //
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }


  openDialog(note: INotes): void {
    const dialogRef = this.dialog.open(InfoPopupComponent, {
      data: {note : note}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
