import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { WordDialogComponent } from '../../dialogs/word-dialog/word-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { WordTreasureService } from '../../services/word-treasure.service';
import { WordTreasure } from '../../interfaces/word-treasure.interface';

@Component({
  selector: 'app-word-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './word-table.component.html',
  styleUrl: './word-table.component.scss',
})
export class WordTableComponent {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  readonly wordDialog = inject(MatDialog);
  readonly displayedColumns: string[] = ['word', 'foreignWord', 'actions'];

  dataSource = new MatTableDataSource<WordTreasure>([]);

  constructor(private wordTreasureService: WordTreasureService) {}

  ngAfterViewInit() {
    this.dataSource.data = this.wordTreasureService.get();
    this.dataSource.sort = this.sort;
  }

  delete(word: WordTreasure): void {
    this.wordTreasureService.delete(word.id);
    this.dataSource.data = this.wordTreasureService.get();
  }

  insert(element = {}): void {
    const dialogRef = this.wordDialog.open(WordDialogComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.wordTreasureService.insert(result);
        this.dataSource.data = this.wordTreasureService.get();
      }
    });
  }

  clearWordTreasure(): void {
    this.wordTreasureService.clear();
    this.dataSource.data = this.wordTreasureService.get();
  }
}
