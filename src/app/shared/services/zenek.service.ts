import { Injectable } from '@angular/core';
import { Zenek } from '../models/Zenek';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZenekService {
  private songs: Zenek[] = [
    { id: 1, cim: 'Dal 1', eloadoId: 1 , artistNev: 'Pitbull', albumId: 1, hossz: 180 },
    { id: 2, cim: 'Dal 2', eloadoId: 2,artistNev: 'Lieless', albumId: 2, hossz: 240 }
  ];

  getSongs(): Observable<Zenek[]> {
    return of(this.songs);
  }

  addSong(song: Zenek): Observable<Zenek> {
    const newSong = { ...song, id: this.songs.length + 1 };
    this.songs.push(newSong);
    return of(newSong);
  }

  getSongById(id: number): Observable<Zenek | undefined> {
    return of(this.songs.find(song => song.id === id));
  }
}
