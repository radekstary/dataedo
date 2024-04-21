import { Component, OnInit } from '@angular/core';
import { Page } from './top-nav.interface';
import { ItemClickEvent } from 'devextreme/ui/menu';
import { NavigationEnd, Router } from '@angular/router';
import { TopNavService } from './top-nav.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  pages: Page[] = [];
  currentRoute: string = '';

  constructor(private router: Router, private service: TopNavService) {
    router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe({
        next: (e: NavigationEnd) => {
          this.currentRoute = e.urlAfterRedirects;
        },
      });
  }

  async ngOnInit(): Promise<void> {
    this.pages = await this.service.getPages();
    this.pages.sort((a, b) => a.order - b.order);
  }

  handleMenuItemClick(e: ItemClickEvent) {
    const page = e.itemData as Page;
    this.router.navigate([page.path]);
  }
}
