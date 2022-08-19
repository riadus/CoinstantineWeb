import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.less']
})
export class HeadComponent implements OnInit {
  
  title = 'Angular 5 Seed';
  
  constructor() { }

  ngOnInit() {
  }

}
