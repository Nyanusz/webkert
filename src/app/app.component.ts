import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MenuComponent} from './shared/menu/menu.component';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatListItemIcon} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {Zenek} from './shared/models/Zenek';
import {user} from '@angular/fire/auth';
import {AuthService} from './shared/services/auth-guard.service';
import {Subscription} from 'rxjs';

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
export class AppComponent  implements OnInit, OnDestroy{
  title = 'webkert';
  isLoggedIn = false;
  private authSubcription?: Subscription;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  this.authSubcription = this.authService.
  currentUser.subscribe(user => {
    this.isLoggedIn = !!user;
    localStorage.setItem('isLoggedIn', this.isLoggedIn ? 'true' : 'false');
    });

  }


  logout(): void {
    this.authService.logout();
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }


  zenek: Zenek[] = [
  ];
  szurtZenek = [...this.zenek];
  eredmenyZenek: Zenek | null = null;

  hozzaAd(zene: Zenek) {
    this.zenek.push({ ...zene, id: '' });
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


  ngOnDestroy() {
    this.authSubcription?.unsubscribe();
  }
}
