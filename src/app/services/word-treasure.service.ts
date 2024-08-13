import { Injectable } from '@angular/core';
import { WordTreasure } from '../interfaces/word-treasure.interface';
import { randomUUID, UUID } from 'crypto';
import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class WordTreasureService {
  private wordTreasure: WordTreasure[] = [];

  localStorage: Storage | undefined = undefined;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.localStorage = document.defaultView?.localStorage;
    this.load();
  }

  find(id: string | undefined) {
    return id ? this.wordTreasure.find((w) => (w.id = id)) : undefined;
  }

  save(): void {
    this.localStorage?.setItem(
      'wordTreasure',
      JSON.stringify(this.wordTreasure),
    );
  }

  private load() {
    this.wordTreasure = JSON.parse(
      this.localStorage?.getItem('wordTreasure') || '[]',
    );
  }

  insert(wt: WordTreasure): void {
    if (wt.id) {
      this.wordTreasure[this.wordTreasure.findIndex((w) => w.id == wt.id)] = wt;
    } else {
      wt.id = uuid.v4().toString();
      wt.errorCount = 0;
      this.wordTreasure.push(wt);
    }
    this.save();
  }

  delete(id: string): void {
    this.wordTreasure.splice(
      this.wordTreasure.findIndex((w) => w.id == id),
      1,
    );
    this.save();
  }

  getRandom(): WordTreasure {
    return this.wordTreasure[
      Math.floor(Math.random() * this.wordTreasure.length)
    ];
  }

  getRandomWeighted(): WordTreasure | undefined {
    if (this.wordTreasure.length == 0) return undefined;
    const totalWeight = this.wordTreasure.reduce(
      (sum, w) => sum + w.errorCount,
      0,
    );
    if (totalWeight === 0) {
      const randomIndex = Math.floor(Math.random() * this.wordTreasure.length);
      return this.wordTreasure[randomIndex];
    }
    const randomNum = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (const w of this.wordTreasure) {
      cumulativeWeight += w.errorCount;
      if (randomNum < cumulativeWeight) {
        return w;
      }
    }
    return undefined;
  }

  getRandomX(amount: number): WordTreasure[] {
    return this.wordTreasure.sort(() => 0.5 - Math.random()).slice(0, amount);
  }

  get(): WordTreasure[] {
    return this.wordTreasure;
  }

  clear(): void {
    this.localStorage?.clear();
    this.load();
  }
}
