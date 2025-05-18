import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Zenek } from '../../shared/models/Zenek';
import { ZenekService } from '../../shared/services/zenek.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth-guard.service';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatToolbar} from '@angular/material/toolbar';
import { NgIf} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  imports: [
    MatToolbar,
    MatTable,
    MatHeaderCell,
    MatCell,
    NgIf,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatPaginator,
    MatRowDef,
    MatProgressSpinner
  ],
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  songs$: Observable<Zenek[]>;
  dataSource = new MatTableDataSource<Zenek>([]);
  displayedColumns: string[] = ['cim', 'mufaj'];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private songService: ZenekService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.songs$ = this.songService.getRecentSongs();
  }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      if (!user) {
        this.errorMessage = 'Kérjük, jelentkezz be a dalok megtekintéséhez!';
        this.isLoading = false;
        this.snackBar.open('Kérjük, jelentkezz be!', 'OK', { duration: 3000 });
        return;
      }

      this.songs$.subscribe({
        next: (songs) => {
          this.dataSource.data = songs;
          this.dataSource.paginator = this.paginator;
          this.isLoading = false;
          this.errorMessage = null;
          if (songs.length === 0) {
            this.errorMessage = 'Nincsenek dalok a playlistben.';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Hiba a dalok betöltése közben!';
          this.snackBar.open('Hiba a dalok betöltése közben!', 'OK', { duration: 3000 });
          console.error('Betöltési hiba:', error);
        }
      });
    });
  }
}
