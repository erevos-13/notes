import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {ImportNotesModule} from '../component/import-notes/import-notes.module';


@NgModule({
  declarations: [HomeComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatCardModule,
        ImportNotesModule
    ]
})
export class HomeModule { }
