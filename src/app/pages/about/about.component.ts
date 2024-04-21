import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { DxScrollViewModule } from 'devextreme-angular';
import { InitializedEvent } from 'devextreme/ui/scroll_view';

@Component({
  standalone: true,
  imports: [CommonModule, DxScrollViewModule],
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  constructor(private cd: ChangeDetectorRef) {}
  scrollViewHeight: number = 0;
  onScrollViewInit(e: InitializedEvent) {
    if (e.element) {
      this.scrollViewHeight = e.element.clientHeight;
      this.cd.detectChanges();
    }
  }
}
