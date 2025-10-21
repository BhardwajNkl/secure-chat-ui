import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GenerateNumberComponent } from '../../components/generate-number/generate-number.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-register-page',
  imports: [
    CommonModule,
    HeaderComponent,
    GenerateNumberComponent
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

}
