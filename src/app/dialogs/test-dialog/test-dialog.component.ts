import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { merge } from 'rxjs';
import { WordDialogComponent } from '../word-dialog/word-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WordTreasure } from '../../interfaces/word-treasure.interface';

@Component({
  selector: 'app-test-dialog',
  standalone: true,
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
  templateUrl: './test-dialog.component.html',
  styleUrl: './test-dialog.component.scss',
})
export class TestDialogComponent {
  readonly dialogRef = inject(MatDialogRef<WordDialogComponent>);
  readonly data = inject<WordTreasure>(MAT_DIALOG_DATA);
  readonly numberOfWords = new FormControl(10, [Validators.required]);
  readonly timeInSeconds = new FormControl(60, [Validators.required]);
  readonly passingPercentage = new FormControl(80, [
    Validators.required,
    Validators.min(0),
    Validators.max(100),
  ]);

  errorMessage = signal('');

  constructor() {
    merge(this.numberOfWords.statusChanges, this.numberOfWords.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    merge(this.timeInSeconds.statusChanges, this.timeInSeconds.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
    merge(
      this.passingPercentage.statusChanges,
      this.passingPercentage.valueChanges,
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (
      this.numberOfWords.hasError('required') ||
      this.timeInSeconds.hasError('required') ||
      this.passingPercentage.hasError('required')
    ) {
      this.errorMessage.set('You must enter a value');
    } else if (
      this.numberOfWords.hasError('max') ||
      this.timeInSeconds.hasError('max') ||
      this.passingPercentage.hasError('max')
    ) {
      this.errorMessage.set('The value is too high');
    } else if (
      this.numberOfWords.hasError('min') ||
      this.timeInSeconds.hasError('min') ||
      this.passingPercentage.hasError('min')
    ) {
      this.errorMessage.set('The value is too low');
    }
  }
  cancel(): void {
    this.dialogRef.close();
  }

  start(): void {
    this.dialogRef.close({
      numberOfWords: this.numberOfWords.value,
      timeInSeconds: this.timeInSeconds.value,
      passingPercentage: this.passingPercentage.value,
    });
  }
}
