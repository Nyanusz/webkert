import { Pipe, PipeTransform } from '@angular/core';
import {Zenek} from '../models/Zenek';

@Pipe({
  name: 'genreFilter'
})
export class GenreFilterPipe implements PipeTransform {

  transform(songs: Zenek[], genre: string): Zenek[] {
    if (!genre) return songs;
    return songs.filter(song => song.mufaj.toLowerCase() === genre.toLowerCase());
  }
}
