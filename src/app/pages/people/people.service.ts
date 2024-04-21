import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Person, RandomPerson, UserGeneratorResponse } from './people.interface';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  API_URI = 'https://randomuser.me/api/';
  appSrvc = inject(AppService)
  constructor(private http: HttpClient) {}

  getRandomPerson(): Observable<Person> {
    return this.http
      .get<Person>(this.API_URI)
      .pipe(
        catchError(this.appSrvc.errorHandler),
        map((res: any) => {
        return res.results[0]
      }));
  }
}
