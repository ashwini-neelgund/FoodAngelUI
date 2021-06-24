import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtClientService } from '../services/jwt-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = '';
  response: any;

  constructor(
    private service: JwtClientService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.service.logout(); //reset the login service on page load
  }

  authenticate() {
    let resp = this.service.generateToken(this.loginForm.value);
    resp.subscribe(
      (data) => {
        console.log(data);
        sessionStorage.setItem('token', 'Bearer ' + data);
        sessionStorage.setItem(
          'userName',
          this.loginForm.get('userName')?.value
        );
        this.router.navigate(['/angel']);
      },
      (error: any) => {
        this.loading = false;
        this.error = "Invalid Username/Password";
      }
    );
  }


}
