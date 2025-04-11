import {Component, OnInit} from '@angular/core';
import {Zenek} from '../../shared/models/Zenek';
import {ActivatedRoute} from '@angular/router';
import {ZenekService} from '../../shared/services/zenek.service';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {ZenehosszPipe} from '../../shared/pipes/zenehossz.pipe';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-zeneinfo',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ZenehosszPipe,
    NgIf
  ],
  templateUrl: './zeneinfo.component.html',
  styleUrl: './zeneinfo.component.scss'
})
export class ZeneinfoComponent implements OnInit {
  zene: Zenek | undefined;

  constructor(
    private route: ActivatedRoute,
    private songService: ZenekService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.songService.getSongById(id).subscribe(song => {
      this.zene = song;
    });
  }

}
