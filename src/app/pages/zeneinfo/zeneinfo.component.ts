import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Zenek} from '../../shared/models/Zenek';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {ZenehosszPipe} from '../../shared/pipes/zenehossz.pipe';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-zeneinfo',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    NgIf,
    MatCardActions,
    ZenehosszPipe,
    MatButton
  ],
  templateUrl: './zeneinfo.component.html',
  styleUrl: './zeneinfo.component.scss'
})
export class ZeneinfoComponent {
  @Input() song?: Zenek;
  @Output() delete = new EventEmitter<string>();
  @Output() select = new EventEmitter<Zenek>();
  @Output() edit = new EventEmitter<Zenek>();

  onDelete() {
    if(this.song?.id)
    this.delete.emit(this.song.id);
  }

  onSelect() {
    if (this.song)
    this.select.emit(this.song);
  }

  onEdit() {
    if (this.song)
    this.edit.emit(this.song);
  }
}
