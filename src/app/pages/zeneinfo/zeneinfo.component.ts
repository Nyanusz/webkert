import {Component, OnInit} from '@angular/core';
import {Zenek} from '../../shared/models/Zenek';
import {ActivatedRoute} from '@angular/router';
import {ZenekService} from '../../shared/services/zenek.service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {ZenehosszPipe} from '../../shared/pipes/zenehossz.pipe';
import {NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-zeneinfo',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ZenehosszPipe,
    NgIf
  ],
  templateUrl: './zeneinfo.component.html',
  styleUrl: './zeneinfo.component.scss'
})
export class ZeneinfoComponent implements OnInit {
  zene: Zenek | undefined;

  constructor(
    private route: ActivatedRoute,
    private songService: ZenekService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id)

    if (id) {
      this.songService.getSongById(id).subscribe({
        next: (song) => {
          this.zene = song;
          if (!song) {
            this.snackBar.open('A keresett dal nem található!', 'OK', { duration: 3000 });
          }
        },
        error: () => {
          this.snackBar.open('Hiba történt a dal betöltésekor!', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Érvénytelen dal azonosító!', 'OK', { duration: 3000 });
    }
  }
}
