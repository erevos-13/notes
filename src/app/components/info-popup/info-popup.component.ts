import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CollectionsService, INotes} from '../../services/collections.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
export interface IInfoPopUp {
  note: INotes;
}
@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {

  public note: INotes;
  public noteForm: FormGroup;
  enableEdit = false;

  constructor(
    public dialogRef: MatDialogRef<InfoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IInfoPopUp,
    private fb: FormBuilder,
    private collectionSrv: CollectionsService
  ) { }

  ngOnInit(): void {
    this.note = this.data.note;
    this.noteForm = this.fb.group({
      title: [(this.note.title) ? this.note.title : ''],
      note: [(this.note.note) ? this.note.note : '']
    });
    this.noteForm.disable();
  }

  onClose() {
    this.dialogRef.close();
  }

  editNote() {

    this.collectionSrv.updateNote(this.noteForm.get('title').value, this.noteForm.get('note').value, this.note.key)
      .then((note) => {
        console.log(note);
        this.onClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSlider(event: MatSlideToggleChange) {
    this.enableEdit = event.checked;
    if (this.enableEdit) {
      this.noteForm.enable();
    }else {
      this.noteForm.disable();
    }
  }

  async removeNote() {
    try {
     const note = await this.collectionSrv.removeNote(this.note.key);
     this.onClose();
    }catch (e) {
      console.log(e);
    }
  }
}
