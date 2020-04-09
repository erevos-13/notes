import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'noteNew';
  constructor(
    private router: Router
  ) {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
  }
}
