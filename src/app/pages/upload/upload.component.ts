import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Zenek} from '../../shared/models/Zenek';
import {ZenekService} from '../../shared/services/zenek.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {Eloado} from '../../shared/models/Eloado';
import {EloadokService} from '../../shared/services/eloadok.service';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-upload',
  imports: [
    MatCard,
    MatCardTitle,
    MatLabel,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatSelectModule,
    NgFor,
    NgIf


  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent implements OnInit{
  songForm: FormGroup;
  eloadok: Eloado[] = [];

  constructor(private fb: FormBuilder,
              private songService: ZenekService,
              private eloadokService: EloadokService,
              private snackBar: MatSnackBar ) {
    this.songForm = this.fb.group({
      cim: ['', Validators.required],
      hossz: [0, [Validators.required, Validators.min(1)]],
      eloadoId: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Előadók betöltése
    this.eloadokService.getEloado().subscribe({
      next: (eloadok) => {
        this.eloadok = eloadok;
      },
      error: (err) => {
        console.error('Hiba az előadók betöltésekor:', err);
        this.snackBar.open('Nem sikerült betölteni az előadókat.', 'OK', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
  onSubmit() {
    if (this.songForm.valid) {
      const selectedEloado = this.eloadok.find(
        (eloado) => eloado.id === this.songForm.value.eloadoId
      );
      const song: Zenek = {
        id: 0,
        cim: this.songForm.value.cim,
        eloadoId: this.songForm.value.eloadoId,
        albumId: 1,
        hossz: this.songForm.value.hossz,
        artistNev: selectedEloado ? selectedEloado.nev : 'Ismeretlen'
      };
      this.songService.addSong(song).subscribe({
        next: () => {
          this.snackBar.open('Dal sikeresen feltöltve!', 'OK', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.songForm.reset({ cim: '', hossz: 0, eloadoId: '' });
        },
        error: (err) => {
          console.error('Hiba a feltöltéskor:', err);
          this.snackBar.open('Nem sikerült feltölteni a dalt.', 'OK', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.snackBar.open('Kérjük, töltse ki az összes mezőt helyesen!', 'OK', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
