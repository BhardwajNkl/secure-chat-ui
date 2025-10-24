import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { LoginResponse } from '../../types/login';
import { GlobalStateService } from '../../shared/global-state.service';

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
  loginForm: FormGroup;

  constructor(
    private readonly userService: UserService,
    private router: Router,
    private readonly globalState: GlobalStateService
  ) {
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
     this.userService.login(secureChatNumber, password).subscribe(
      (response: LoginResponse) => {
        // set state
        this.globalState.setLogin(response);
        // navigate to chat page
        this.router.navigate(['/chat']);
      },
      (error: any) => {
        console.error(error);
        alert("Something went wrong! Try again.again")
      }
    )
  }
}
