import { Component, OnInit } from '@angular/core';
import {CollectionsService, INotes} from '../../services/collections.service';
import {Observable} from 'rxjs';

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
    private collectionsSrv: CollectionsService
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
    this.collectionsSrv.getNoteById(note)
      .then((noteSelected) => {
        console.log(noteSelected);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
