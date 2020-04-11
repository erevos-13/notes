import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['erevos13@gmail.com', [Validators.required]],
      password: ['1qaz2wsx', [Validators.required]]
    });
  }

  async onLogin() {
    try {
      this.loading = true;
      const login_ = await  this.authSrv.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
      this.loading = false;
      console.log(login_);
      this.router.navigate(['/home']);
    } catch (e) {
      this.loading = false;
      console.log(e);
    }
  }
}
