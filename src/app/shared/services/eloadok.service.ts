import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Eloado} from '../models/Eloado';

@Injectable({
  providedIn: 'root'
})
export class EloadokService {
  private eloado: Eloado[] = [
    { id: 1, nev: 'Pitbull', mufaj: 'Pop', zenek: [] },
    { id: 2, nev: 'Lieless', mufaj: 'Rave', zenek: [] }
  ];

  private eloadokSubject = new BehaviorSubject<Eloado[]>(this.eloado);
  eloado$ = this.eloadokSubject.asObservable();
  getEloado(): Observable<Eloado[]> {
    return this.eloado$;
  }

  addEloado(eloado: Eloado): Observable<Eloado> {
    const newEloado = { ...eloado, id: this.eloado.length + 1 };
    this.eloado.push(newEloado);
    return of(newEloado);
  }

  getEloadoById(id: number): Observable<Eloado | undefined> {
    return of(this.eloado.find(song => song.id === id));
  }
}
