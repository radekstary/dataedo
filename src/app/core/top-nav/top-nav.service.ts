import { Injectable } from '@angular/core';
import { Page } from './top-nav.interface';
import { PAGES } from 'src/app/mock-data';

@Injectable({
  providedIn: 'root',
})
export class TopNavService {
  constructor() {}

  getPages(): Promise<Page[]> {
    return new Promise<Page[]>((resolve) => {
      resolve(PAGES);
    });
  }
}
