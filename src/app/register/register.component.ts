import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      gender: new FormControl(),
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required]],
      altNumber: new FormControl(),
      address: this.formBuilder.group({
        address1: ['', [Validators.required]],
        address2: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required]],
      }),
      idFile: ['', [Validators.required]],
      termsAndConditions: ['', [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {}

  registerAngel() {
    this.userService.registerAngel(this.registerForm.value).subscribe( data => {
      console.log("back to Component");
      console.log(data);
      this.router.navigate(['/angel']);
    }, error => console.log(error));
  }

  resetForm() {
    this.registerForm.reset();
  }
}
