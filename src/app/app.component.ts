import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { WordTableComponent } from './components/word-table/word-table.component';
import { WordQuizComponent } from './components/word-quiz/word-quiz.component';
import { WordTestComponent } from './components/word-test/word-test.component';
import { WordTreasureService } from './services/word-treasure.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    WordTestComponent,
    WordQuizComponent,
    WordTableComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    RouterOutlet,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isTestOngoing: boolean = false;

  private cdr = inject(ChangeDetectorRef);

  constructor(public wordTreasureService: WordTreasureService) {}

  changeOngoingTest(): void {
    console.log(this.isTestOngoing);
    this.isTestOngoing = !this.isTestOngoing;
    console.log(this.isTestOngoing);
    this.cdr.detectChanges();
  }
}
