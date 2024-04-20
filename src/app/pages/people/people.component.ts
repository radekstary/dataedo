import { Component } from '@angular/core';
import { DxButtonModule, DxLoadIndicatorModule } from 'devextreme-angular';
import { PeopleService } from './people.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Person } from './people.interface';

@Component({
  standalone: true,
  imports: [CommonModule, DxButtonModule, DxLoadIndicatorModule],
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent {
  src: string = '';
  alt: string = '';
  width: number = 120;
  height: number = 120;
  name: string = 'John Doe';

  placeholder: string =
    'https://cdn3.vectorstock.com/i/1000x1000/36/32/person-gray-photo-placeholder-man-vector-23503632.jpg';

  person$: Observable<any> | undefined;
  hasError: boolean = false;
  errorText: string = '';
  constructor(private service: PeopleService) {
    this.getNewPerson();
  }

  getNewPerson() {
    this.person$ = this.service.getRandomPerson();
    this.person$.subscribe({
      next: (res: Person) => {
        const pic = res.picture;
        this.src = pic.large || pic.medium || pic.thumbnail || this.placeholder;
        this.name = `${res.name.title ? res.name.title + ' ' : ''}${
          res.name.first
        } ${res.name.last}`;
        this.hasError = false;
        this.errorText = '';
      },
      error: (err) => {
        this.errorText = err;
        this.hasError = true;
      },
    });
  }
}
