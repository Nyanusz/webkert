import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../../shared/services/auth-guard.service';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {User} from '@angular/fire/auth';
import {MatToolbar} from '@angular/material/toolbar';
import {AsyncPipe, NgClass, NgForOf, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import {Observable, Subscription} from 'rxjs';
import {Zenek} from '../../shared/models/Zenek';
import {ZenekService} from '../../shared/services/zenek.service';
import {GenreFilterPipe} from '../../shared/pipes/genre-filter.pipe';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatList, MatListItem} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    MatIcon,
    MatToolbar,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    NgIf,
    MatInput,
    MatButton,
    MatFormField,
    MatSelect,
    GenreFilterPipe,
    AsyncPipe,
    MatOption,
    FormsModule,
    MatList,
    MatListItem,
    RouterLink,
    MatIconButton,
    MatAnchor,
    NgForOf
  ],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user$ = null as any;
  zenek$: Observable<Zenek[]>;
  selectedGenre: string = '';
  subscription?: Subscription


  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor(protected authService: AuthService,
              private snackBar: MatSnackBar,
              private songService: ZenekService) {

    this.zenek$ = this.songService.getSongs();

  }

  ngOnInit() {
    this.zenek$ = this.songService.getSongs();

    this.user$ = this.authService.getUser();
    this.user$.subscribe((user : User | null) => {
      if (user) {
        this.form.patchValue({
          name: user.displayName || '',
          email: user.email || ''
        });
      }
    });
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  deleteSong(id: string) {
    this.songService.deleteSong(id).then(() => console.log('Song deleted'));
  }
  onSubmit() {
    this.snackBar.open('Profil frissítve!', 'OK', { duration: 3000 });
  }

}
