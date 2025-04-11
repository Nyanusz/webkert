import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zenehossz'
})
export class ZenehosszPipe implements PipeTransform {

  transform(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
