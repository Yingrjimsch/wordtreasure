import { Component, Input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WordTreasureService } from '../../services/word-treasure.service';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { time } from 'console';
import { WordTreasure } from '../../interfaces/word-treasure.interface';
import { QuizzedWord } from '../../interfaces/quizzed-word.interface';

@Component({
  selector: 'app-word-quiz',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './word-quiz.component.html',
  styleUrl: './word-quiz.component.scss',
})
export class WordQuizComponent implements OnInit {
  @Input() isTest!: boolean;
  readonly hiddenWord = new FormControl('', [Validators.required]);

  message = signal('');

  // private wordTreasure: WordTreasure[] = [];
  currentWord: QuizzedWord = { id: '', shownWord: '', hiddenWord: '' };

  constructor(private wordTreasureService: WordTreasureService) {}

  ngOnInit(): void {
    this.loadCurrentWord();
  }

  loadCurrentWord(): void {
    let word = this.wordTreasureService.getRandomWeighted();
    const isWordShown = Math.round(Math.random());
    if (word) {
      this.currentWord = {
        id: word.id,
        shownWord: isWordShown ? word.word : word.foreignWord,
        hiddenWord: isWordShown ? word.foreignWord : word.word,
      };
    }
  }

  check(): void {
    let word = this.wordTreasureService.find(this.currentWord?.id);
    if (this.hiddenWord.value == this.currentWord?.hiddenWord) {
      this.message.set('Good job!');
      if (word && word.errorCount > 0) {
        word.errorCount--;
        this.wordTreasureService.insert(word);
      }
    } else {
      if (word) {
        word.errorCount++;
        this.wordTreasureService.insert(word);
      }
      this.message.set(
        `This is wrong, right answer: ${this.currentWord?.hiddenWord}`,
      );
    }

    setTimeout(() => {
      this.message.set('');
      this.loadCurrentWord();
      this.hiddenWord.setValue('');
    }, 2000);
  }
}
