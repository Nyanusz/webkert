import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, query, where, orderBy, limit, startAfter } from '@angular/fire/firestore';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import { Zenek } from '../models/Zenek';

@Injectable({ providedIn: 'root' })
export class ZenekService {
  constructor(private firestore: Firestore) {}

  addSong(zenek: Zenek): Promise<void> {
    return addDoc(collection(this.firestore, 'zenek'), zenek).then(() => {});
  }

  getSongs(): Observable<Zenek[]> {
    return collectionData(collection(this.firestore, 'zenek'), { idField: 'id' }) as Observable<Zenek[]>;
  }

  updateSong(id: string, zenek: Partial<Zenek>): Promise<void> {
    return updateDoc(doc(this.firestore, 'zenek', id), zenek);
  }

  deleteSong(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'zenek', id));
  }

  getPopSongs(): Observable<Zenek[]> {
    const q = query(collection(this.firestore, 'zenek'), where('mufaj', '==', 'pop'), orderBy('cim'), limit(10));
    return collectionData(q, { idField: 'id' }) as Observable<Zenek[]>;
  }

  getSortedSongs(): Observable<Zenek[]> {
    const q = query(collection(this.firestore, 'zenek'), orderBy('cim'));
    return collectionData(q, { idField: 'id' }) as Observable<Zenek[]>;
  }

  getRecentSongs(): Observable<Zenek[]> {
    const q = query(collection(this.firestore, 'zenek'), limit(5));
    return collectionData(q, { idField: 'id' }).pipe(
      map(docs => docs.map(doc => ({
        id: doc.id,
        cim: doc['cim'] || '',
        eloadoId: doc['eloadoId'] || '',
        albumId: doc['albumId'] || '',
        hossz: doc['hossz'] || 0,
        mufaj: doc['mufaj'] || ''
      } as Zenek))),
      tap(songs => console.log('Legutóbbi dalok:', songs)),
      catchError(error => {
        console.error('Hiba a legutóbbi dalok lekérdezésekor:', error);
        return throwError(() => new Error('Hiba a legutóbbi dalok lekérdezésekor'));
      })
    );
  }

  getPaginatedSongs(lastDoc: any): Observable<Zenek[]> {
    const q = query(collection(this.firestore, 'zenek'), orderBy('cim'), startAfter(lastDoc), limit(10));
    return collectionData(q, { idField: 'id' }) as Observable<Zenek[]>;
  }

  getSongsByAlbum(albumId: string): Observable<Zenek[]> {
    const q = query(collection(this.firestore, 'zenek'), where('albumId', '==', albumId));
    return collectionData(q, { idField: 'id' }) as Observable<Zenek[]>;
  }
}
