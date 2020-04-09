import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-import-notes',
  templateUrl: './import-notes.component.html',
  styleUrls: ['./import-notes.component.scss']
})
export class ImportNotesComponent implements OnInit {
  importNoteForm: FormGroup;
  @Output() note: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.importNoteForm = this.fb.group({
      note: ['', [Validators.required]]
    });
  }

  onNote() {
    this.note.emit(this.importNoteForm.get('note').value);
  }
}
