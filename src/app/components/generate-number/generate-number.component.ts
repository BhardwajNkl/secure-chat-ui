import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type GenerateNumberResponse = {
  generatedNumber: string
}


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
  generatedNumber: string = "";

  generateNumberForm = new FormGroup({
    password: new FormControl(''),
  });

  constructor(private userService: UserService) {
  }

  generateNewNumber() {
    const password = this.generateNumberForm.value.password;
    if (!password) {
      alert("fill in the required field!");
      return;
    }
    this.userService.generateNewNumber(password).subscribe(
      (response: GenerateNumberResponse) => {
        this.generatedNumber = response.generatedNumber;
      },
      (error: any) => {
        console.error(error);
        alert("Something went wrong! Try again.again")
      }
    )
  }
}
