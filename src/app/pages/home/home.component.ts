import { Component, OnInit } from '@angular/core';
import {CollectionsService, INotes} from '../../services/collections.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {InfoPopupComponent} from '../../components/info-popup/info-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title: string;
  note: string;
  userNotes: Observable<any[]>;

  constructor(
    private collectionsSrv: CollectionsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
   this.userNotes = this.collectionsSrv.getNotesOfUser();
  }

  addNotes() {
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
