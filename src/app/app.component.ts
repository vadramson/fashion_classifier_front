import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-starter';

  constructor(){
    // this.addCount();
  }

  count = 0;

  addCount(){
    this.count++;
    console.log('count: ' + this.count)
  }
  reduceCount(){
    this.count--;
    console.log('count: ' + this.count)
  }
}
