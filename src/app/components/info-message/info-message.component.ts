import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
export interface IInfoPopUpMessage {
  title: string;
  message: string;
}

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss']
})
export class InfoMessageComponent implements OnInit {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<InfoMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IInfoPopUpMessage,
  ) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
  }

  onClose() {
    this.dialogRef.close();
  }
}
