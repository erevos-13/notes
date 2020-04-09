import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImportNotesComponent} from './import-notes.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [ImportNotesComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [
    ImportNotesComponent
  ]
})
export class ImportNotesModule { }
