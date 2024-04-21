import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'people',
  },
  {
    path: 'people',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/people/people.component').then((m) => m.PeopleComponent),
  },
  {
    path: 'about',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: '**',
    redirectTo: 'people',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false }), DxButtonModule],
  providers: [],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
