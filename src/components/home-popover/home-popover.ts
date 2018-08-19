import { Component } from '@angular/core';

/**
 * Generated class for the HomePopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-popover',
  templateUrl: 'home-popover.html'
})
export class HomePopoverComponent {

  text: string;

  constructor() {
    console.log('Hello HomePopoverComponent Component');
    this.text = 'Hello World';
  }

}
