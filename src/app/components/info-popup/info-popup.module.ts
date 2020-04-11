import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InfoPopupComponent} from './info-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



@NgModule({
  declarations: [InfoPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  exports: [
    InfoPopupComponent
  ]
})
export class InfoPopupModule { }
