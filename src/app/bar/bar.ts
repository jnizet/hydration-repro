import { Component } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-bar',
  imports: [
    JsonPipe
  ],
  templateUrl: './bar.html',
  styleUrl: './bar.css'
})
export class Bar {
  constructor() {
    console.log('Bar is being constructed');
  }

  readonly bar = httpResource<{name: string}>(() => 'http://localhost:4200/bar.json');
}
