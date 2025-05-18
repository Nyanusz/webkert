import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { ZenekService } from '../../shared/services/zenek.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {NgIf} from '@angular/common';
import {MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {Zenek} from '../../shared/models/Zenek';

@Component({
  selector: 'app-upload',

  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatOption,
    MatSelect,
    NgIf,
    MatButton,
    MatInput,
    MatFormField
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  form = new FormGroup({
    cim: new FormControl('', Validators.required),
    eloadoId: new FormControl('', Validators.required),
    albumId: new FormControl('', Validators.required),
    hossz: new FormControl(0, [Validators.required, Validators.min(1)]),
    mufaj: new FormControl('', Validators.required)
  });

  constructor(private songService: ZenekService, private snackBar: MatSnackBar) {}

  onSubmit() {
    if (this.form.valid) {
      const zenek: Zenek = {
        cim: this.form.value.cim!,
        eloadoId: this.form.value.eloadoId!,
        albumId: this.form.value.albumId!,
        hossz: this.form.value.hossz!,
        mufaj: this.form.value.mufaj!
      };
      this.songService.addSong(zenek).then(() => {
        this.snackBar.open('Dal hozzáadva!', 'OK', { duration: 3000 });
        this.form.reset();
      }).catch(error => {
        this.snackBar.open('Hiba a dal hozzáadása közben!', 'OK', { duration: 3000 });
      });
    }
  }
}
