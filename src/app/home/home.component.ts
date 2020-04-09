import { Component, OnInit } from '@angular/core';
import {ColletionsService} from '../services/colletions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  openImport = false;

  constructor(
    private colletionsSrv: ColletionsService
  ) { }

  ngOnInit(): void {
  }

  addNote() {
    this.openImport = true;
  }
  onSubmit(event) {
    this.colletionsSrv.addNotes(event);
  }

}
