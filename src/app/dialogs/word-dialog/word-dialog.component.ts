import { Component, inject, model, OnInit, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  FormControl,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WordTreasure } from '../../interfaces/word-treasure.interface';

@Component({
  selector: 'app-word-dialog',
  standalone: true,
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class WordDialogComponent {
  readonly dialogRef = inject(MatDialogRef<WordDialogComponent>);
  readonly data = inject<WordTreasure>(MAT_DIALOG_DATA);
  readonly word = new FormControl(this.data.word, [Validators.required]);
  readonly foreignWord = new FormControl(this.data.foreignWord, [
    Validators.required,
  ]);

  errorMessage = signal('');

  constructor() {
    merge(this.word.statusChanges, this.word.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    merge(this.foreignWord.statusChanges, this.word.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (
      this.word.hasError('required') ||
      this.foreignWord.hasError('required')
    ) {
      this.errorMessage.set('You must enter a value');
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close({
      id: this.data.id ? this.data.id : undefined,
      word: this.word.value,
      foreignWord: this.foreignWord.value,
    });
  }
}
