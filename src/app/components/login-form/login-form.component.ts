import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

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
  
  loginForm = new FormGroup({
    secureChatNumber: new FormControl(''),
    password: new FormControl(''),
  });

   constructor(private userService: UserService) {
    }

  login() {
    const {secureChatNumber, password} = this.loginForm.value;
    if (!password || !secureChatNumber) {
      alert("fill in the required field!");
      return;
    }
    this.userService.login(secureChatNumber, password).subscribe(
      (response: boolean) => {
        alert("Login success");
      },
      (error: any) => {
        console.error(error);
        alert("Something went wrong! Try again.again")
      }
    )
  }
}
