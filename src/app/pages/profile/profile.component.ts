import { Component } from '@angular/core';
import {MatCardContent, MatCardTitle, MatCard} from '@angular/material/card';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardTitle,
    MatCardContent,
    MatCard
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user = {
    name: {
      firstname: 'Nyanusz',
      lastname: 'Tesztelo'
    },
    email: 'test@gmail.com'
  };
}
