import {Component, EventEmitter, Output} from '@angular/core';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Zenek} from '../../shared/models/Zenek';

@Component({
  selector: 'app-upload',
  imports: [
    MatCard,
    MatCardTitle,
    MatLabel,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatFormField

  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  songForm: FormGroup;
  @Output() songAdded = new EventEmitter<Zenek>();

  constructor(private fb: FormBuilder) {
    this.songForm = this.fb.group({
      title: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.songForm.valid) {
      const song: Zenek = {
        id: 0,
        cim: this.songForm.value.cim,
        eloadoId: 1,
        albumId: 1,
        hossz: this.songForm.value.hossz,
        artistNev: ''
      };
      this.songAdded.emit(song);
      this.songForm.reset();
    }
  }
}
