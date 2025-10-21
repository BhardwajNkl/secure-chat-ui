import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { LoginResponse } from '../../types/login';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  loginResponse!: LoginResponse;

  loginForm: FormGroup;

  constructor(private readonly userService: UserService) {
    this.loginForm = new FormGroup({
      secureChatNumber: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    if (!this.loginForm.valid) {
      alert("Submit form correctly!");
      return;
    }
    const {secureChatNumber, password} = this.loginForm.value;
    this.login(secureChatNumber, password);
  }

  login(secureChatNumber: string, password: string) {
    this.userService.login(secureChatNumber, password).subscribe(
      (response: LoginResponse) => {
        this.loginResponse = response;
        alert("Login success");
      },
      (error: any) => {
        console.error(error);
        alert("Something went wrong! Try again.again")
      }
    )
  }
}
