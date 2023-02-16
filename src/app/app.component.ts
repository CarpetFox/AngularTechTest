import { Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { users } from 'src/data/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  allUsers: any[] = [];
  displayingUsers: any[] = [];

  @ViewChild('nameSearch') input!: ElementRef;

  ngOnInit(): void {
    // the logic for loading in the users would ideally be moved into an injected service
    this.allUsers = users.sort((a, b) => a.name.localeCompare(b.name));
    this.displayingUsers = this.allUsers;
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        tap(_ => {
          this.filterResults(this.input.nativeElement.value);
        })
      ).subscribe();
  }

  filterResults(filter: string): void {
    this.displayingUsers = this.allUsers.filter(u => u.name.toLowerCase().indexOf(filter) > -1);
  }

  resetBalances(): void {
    this.allUsers.forEach(u => {
      u.balance = '0';
    })
  }
}
