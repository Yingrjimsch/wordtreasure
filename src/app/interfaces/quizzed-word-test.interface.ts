import { QuizzedWord } from './quizzed-word.interface';

export interface QuizzedTestWord extends QuizzedWord {
  isCorrect: boolean | undefined;
}
