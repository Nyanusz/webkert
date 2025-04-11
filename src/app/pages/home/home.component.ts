import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {MatCard, MatCardSmImage, MatCardTitle} from '@angular/material/card';
import {MatDivider, MatList, MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {Zenek} from '../../shared/models/Zenek';
import {ZenekService} from '../../shared/services/zenek.service';
import {FilterComponent} from '../filter/filter.component';
import {ZenehosszPipe} from '../../shared/pipes/zenehossz.pipe';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {Eloado} from '../../shared/models/Eloado';
import {EloadokService} from '../../shared/services/eloadok.service';
import {combineLatest, map, Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatCardTitle, MatList, MatListItem,
    MatIcon, FilterComponent,  NgClass, NgStyle, MatDivider, MatCard, NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  zenek: Zenek[] = [];
  filteredSongs: Zenek[] = [];
  selectedSong: Zenek | null = null;

  constructor(private songService: ZenekService ,
              private eloadoService: EloadokService ,
              private router: Router) {}

  ngOnInit() {
    combineLatest([
      this.songService.getSongs(),
      this.eloadoService.getEloado()
    ]).pipe(
      map(([songs, artists]) => {
        return songs.map(song => ({
          ...song,
          artistNev: artists.find(artist => artist.id === song.eloadoId)?.nev || 'Ismeretlen',

        }));
      })
    ).subscribe(combineLatest => {
      this.zenek = combineLatest;
      this.filteredSongs = [...combineLatest];
    });
  }

  applyFilter(filter: string) {
    this.filteredSongs = this.zenek.filter(song =>
      song.cim.toLowerCase().includes(filter.toLowerCase())
    );
  }

  selectSong(song: Zenek) {
    this.selectedSong = song;
    this.router.navigate(['/zene', song.id]);
  }

  protected readonly ZenehosszPipe = ZenehosszPipe;
  protected readonly combineLatest = combineLatest;
}
