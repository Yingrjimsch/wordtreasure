# Wordtreasure

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Guide
There are three different tabs Edit | Train | Test.
- Edit: In this tab one can add a new word pair, edit/delete an existing word pair and clear the table of word pairs completely
- Train: Here one is able to train on different word pairs, they are selected with a weighted random so the hard words (most error prune) are trained on the most. After a wrong guess is made, the right guess is shown.
- Test: Here one can test his knowledge. Therefore one can start a test and configure the percentage to pass, the test duration and the number of words to test on. If the number of words exceed the number of words in the word list, the full list is taken. If the time ran out or all words were queried, the result is shown. While a test is running the user is not allowed to switch between tabs.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
