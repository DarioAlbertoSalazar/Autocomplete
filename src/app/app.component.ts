import { Component } from '@angular/core';
import { map } from 'rxjs';

import { AutocompleteService } from './service/autocomplete.service';

export interface User {
  name: string;
  login: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //show the elements and map just the login info
  userList$ = this.autocompleteService.userList$;
  //send a empty string to the ngmodel
  name = ''

  constructor(private autocompleteService: AutocompleteService) {}

  //find the elements in the endpoint
  findUser(event: string) {
    this.autocompleteService.findUser(event);
  }
//select name and hide list
  selectName(event: string) {
    this.name = event;
    this.autocompleteService.hideList()
  }
}
