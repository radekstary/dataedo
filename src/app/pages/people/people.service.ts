import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Person, RandomPerson, UserGeneratorResponse } from './people.interface';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  API_URI = 'https://randomuser.me/api/';
  constructor(private http: HttpClient) {}

  getRandomPerson(): Observable<Person> {
    return this.http
      .get<Person>(this.API_URI)
      .pipe(map((res: any) => {
        return res.results[0]
      }));
  }
}
