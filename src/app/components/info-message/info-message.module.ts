import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoMessageComponent } from './info-message.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [InfoMessageComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    InfoMessageComponent
  ]
})
export class InfoMessageModule { }
