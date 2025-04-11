import {Zenek} from './Zenek';
import {User} from './User';

export interface Playlist {
  id: number
  nev: string;
  letrehozta: User;
  zenek: Zenek[];

}
