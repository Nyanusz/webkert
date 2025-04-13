import { Injectable } from '@angular/core';
import { Zenek } from '../models/Zenek';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZenekService {
  private songs: Zenek[] = this.loadSongsFromStorage();

  private songsSubject = new BehaviorSubject<Zenek[]>(this.songs);
  songs$ = this.songsSubject.asObservable();

  constructor() {
    this.songs = this.loadSongsFromStorage();
    this.songsSubject.next(this.songs);
  }

  private loadSongsFromStorage(): Zenek[] {
    const storedSongs = localStorage.getItem('songs');
    return storedSongs
      ? JSON.parse(storedSongs)
      : [
        { id: 1, cim: 'Dal 1', eloadoId: 1, artistNev: 'Pitbull', albumId: 1, hossz: 180 },
        { id: 2, cim: 'Dal 2', eloadoId: 2, artistNev: 'Lieless', albumId: 2, hossz: 240 }
      ];
  }

  private saveSongsToStorage() {
    localStorage.setItem('songs', JSON.stringify(this.songs));
  }

  getSongs(): Observable<Zenek[]> {
    const validSongs = this.songs.filter(song => !!song.cim);
    this.songsSubject.next(validSongs);
    return this.songs$;
  }

  addSong(song: Zenek): Observable<Zenek> {
    if (!song.cim) {
      console.error('Hiba: A dal cím kötelező!', song);
      throw new Error('A dal cím kötelező!');
    }
    const newSong: Zenek = {
      ...song,
      id: this.songs.length + 1,
      artistNev: song.artistNev || 'Ismeretlen'
    };
    this.songs.push(newSong);
    this.songsSubject.next([...this.songs]);
    return of(newSong);
  }

  getSongById(id: number): Observable<Zenek | undefined> {
    return of(this.songs.find(song => song.id === id));
  }
}
