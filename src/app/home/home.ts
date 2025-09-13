import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Bar } from '../bar/bar';

@Component({
  selector: 'app-home',
  imports: [
    JsonPipe,
    Bar
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  readonly foo = httpResource<{name: string}>(() => 'http://localhost:4200/foo.json');

  logLoading(): string {
    console.log('loading block is being displayed');
    return '';
  }
}
