import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  username = '';
  password = '';
  invalidLogin = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginservice: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  checkLogin() {
    this.username = this.loginForm.value['email'];
    this.password = this.loginForm.value['password'];
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['/angel']);
        this.invalidLogin = false;
      },
      error => {
        this.invalidLogin = true;
      }
    ));
  }
}
