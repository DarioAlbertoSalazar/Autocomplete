import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, filter } from 'rxjs';

import { User } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  user = new BehaviorSubject<string>('');
  user$ = this.user.asObservable();
  userList = new BehaviorSubject<User[]>([]);
  userList$ = this.userList.asObservable();

  constructor() {
    //filter the results and take 1.5 seconds to call the api
    this.user$
      .pipe(
        filter((value) => !!value),
        debounceTime(1500)
      )
      .subscribe((value) => this.getUsers(value));
  }
//usign fetch instead of httpclient
  async getUsers(user: string): Promise<void> {
    const response = await fetch(
      `https://api.github.com/search/users?q=${user}`
    );
    this.userList.next((await response.json()).items);
  }
//find users in the endpoint
  findUser(searchTerm: string) {
    this.user.next(searchTerm);
  }
//hide list
  hideList() {
    this.userList.next([])
  }
}
