import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {RegisterFormValidator} from '../../shared/validators/register-form.validator';
import { RegistrationResponse } from '../../types/registration';


@Component({
  selector: 'app-generate-number',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './generate-number.component.html',
  styleUrl: './generate-number.component.css'
})
export class GenerateNumberComponent {
  registrationResponse!: RegistrationResponse;

  registerForm: FormGroup;

  constructor(private readonly userService: UserService) {
    this.registerForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, RegisterFormValidator.passwordMatchValidator());
  }

  onSubmit() {
    console.log(this.registerForm.value);
    if (!this.registerForm.valid) {
      alert("Submit form correctly!");
      return;
    }

    this.register(this.registerForm.value.password);
  }

  register(password: string) {
    this.userService.register(password).subscribe(
      (response: RegistrationResponse) => {
        this.registrationResponse = response;
      },
      (error: any) => {
        console.error(error);
        alert("Something went wrong! Try again.")
      }
    )
  }
}
