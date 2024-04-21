import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  DxButtonModule,
  DxMenuModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import { RouterOutlet } from '@angular/router';
import { TopNavComponent } from './core/top-nav/top-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, TopNavComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DxButtonModule,
    DxMenuModule,
    DxScrollViewModule,
    HttpClientModule,
    RouterOutlet,
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
