import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MenuComponent} from './shared/menu/menu.component';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatListItemIcon} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Zenek} from './shared/models/Zenek';

@Component({
  selector: 'app-root',
  imports: [
    MenuComponent,
    MatButtonModule,
    MatToolbar,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
    MatListItemIcon,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'webkert';
  isLoggedIn = false;

  constructor() {
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    window.location.href = '/home';
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }


  zenek: Zenek[] = [
  ];
  szurtZenek = [...this.zenek];
  eredmenyZenek: Zenek | null = null;

  hozzaAd(zene: Zenek) {
    this.zenek.push({ ...zene, id: this.zenek.length + 1 });
    this.szurtZenek = [...this.zenek];
  }

  zenekSzurese(filter: string) {
    this.szurtZenek = this.zenek.filter(zene =>
      zene.cim.toLowerCase().includes(filter.toLowerCase())
    );
  }

  zeneListaz(zene: Zenek) {
    this.eredmenyZenek = zene;
  }
}
