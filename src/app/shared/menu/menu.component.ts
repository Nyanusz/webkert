import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenav} from '@angular/material/sidenav';
import {AuthService} from '../services/auth-guard.service';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,

  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();

  constructor(private authService : AuthService) {
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  closeMenu(){
    if(this.sidenav){
      this.sidenav.close();
    }
  }

  logout(){
    this.authService.logout().then(() => {
      this.logoutEvent.emit();
      this.closeMenu()
    })
  }
}
