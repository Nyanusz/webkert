import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {MatCard, MatCardImage, MatCardSmImage, MatCardTitle} from '@angular/material/card';
import {MatDivider, MatList, MatListItem} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {Zenek} from '../../shared/models/Zenek';
import {ZenekService} from '../../shared/services/zenek.service';
import {FilterComponent} from '../filter/filter.component';
import {ZenehosszPipe} from '../../shared/pipes/zenehossz.pipe';
import {NgClass, NgForOf, } from '@angular/common';
import {EloadokService} from '../../shared/services/eloadok.service';
import {combineLatest, map} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatCardTitle, MatList, MatListItem,
    MatIcon, FilterComponent, NgClass, MatDivider, MatCard, NgForOf, ZenehosszPipe],
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
              private router: Router) {

  }

  ngOnInit() {
    combineLatest([
      this.songService.getSongs(),
      this.eloadoService.getEloado()
    ]).pipe(
      map(([songs, artists]) => {
        return songs.map(song => {
          if (!song.cim) {
            console.warn('Hiányzó cim a dalnál:', song);
          }
          return {
            ...song,
            artistNev: artists.find(artist => artist.id === song.eloadoId)?.nev || 'Ismeretlen',
          };
        }).filter(song => !!song.cim); // Szűrjük ki a hibás dalokat
      })
    ).subscribe(combineLatest => {
      this.zenek = combineLatest;
      this.filteredSongs = [...combineLatest];
    });
  }

  applyFilter(filter: string) {
    this.filteredSongs = this.zenek.filter(song => {
      const cimMatch = song.cim ? song.cim.toLowerCase().includes(filter.toLowerCase()) : false;
      const artistMatch = song.artistNev ? song.artistNev.toLowerCase().includes(filter.toLowerCase()) : false;
      return cimMatch || artistMatch;
    });
  }

  selectSong(song: Zenek) {
    this.selectedSong = song;
    this.router.navigate(['/zene', song.id]);
  }

  protected readonly ZenehosszPipe = ZenehosszPipe;

}
