import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TestDialogComponent } from '../../dialogs/test-dialog/test-dialog.component';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { WordTreasureService } from '../../services/word-treasure.service';
import { QuizzedTestWord } from '../../interfaces/quizzed-word-test.interface';

@Component({
  selector: 'app-word-test',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    CountdownComponent,
  ],
  templateUrl: './word-test.component.html',
  styleUrl: './word-test.component.scss',
})
export class WordTestComponent {
  @ViewChild('cd', { static: false }) private countdown:
    | CountdownComponent
    | undefined;
  @Input() isTestOngoing!: boolean;
  @Output() changeOngoingTest = new EventEmitter(); // Output property to emit changes back to the parent

  readonly hiddenWord = new FormControl('', [Validators.required]);
  readonly dialog = inject(MatDialog);

  testWordTreasure: QuizzedTestWord[] = [];
  testWordTreasureIndex: number = 0;
  countdownConfig = { leftTime: 60, demand: true };

  constructor(private wordTreasureService: WordTreasureService) {}

  next(): void {
    this.currentWord().isCorrect =
      this.hiddenWord.value?.toLowerCase() ==
      this.currentWord().hiddenWord.toLowerCase();
    this.hiddenWord.setValue('');
    if (this.testWordTreasureIndex >= this.testWordTreasure.length - 1) {
      this.changeOngoingTest.emit();
      return;
    }
    this.testWordTreasureIndex++;
  }

  currentWord(): QuizzedTestWord {
    return this.testWordTreasure[this.testWordTreasureIndex];
  }

  start() {
    const dialogRef = this.dialog.open(TestDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.countdownConfig.leftTime = result.timeInSeconds;
        this.testWordTreasureIndex = 0;
        this.testWordTreasure = this.wordTreasureService
          .getRandomX(result.numberOfWords)
          .map((w) => {
            const isWordShown = Math.round(Math.random());
            return {
              id: w.id,
              shownWord: isWordShown ? w.word : w.foreignWord,
              hiddenWord: !isWordShown ? w.word : w.foreignWord,
              isCorrect: undefined,
            };
          });
        this.changeOngoingTest.emit();
        if (this.countdown) {
          this.countdown?.begin();
        } else {
          console.log('countdown not available');
        }
      }
    });
  }
  handleDone(e: CountdownEvent) {
    if (e.action == 'done') {
      this.changeOngoingTest.emit();
    }
  }

  getCorrectPercentage(): number {
    return (
      (this.testWordTreasure.filter((w) => w.isCorrect).length /
        this.testWordTreasure.length) *
      100
    );
  }

  getPassMessage(): string {
    if (this.getCorrectPercentage() >= 50) {
      return 'Congratulations you have passed the test!';
    } else {
      return 'You have not passed, learn and try again.';
    }
  }
}
