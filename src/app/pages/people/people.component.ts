import { ChangeDetectorRef, Component } from '@angular/core';
import { DxButtonModule, DxLoadIndicatorModule } from 'devextreme-angular';
import { PeopleService } from './people.service';
import { CommonModule } from '@angular/common';
import { Person } from './people.interface';
import { INTERVAL, Timer } from './reloadTimer';

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

  person: Person | undefined;
  hasError: boolean = false;
  timer!: Timer;

  constructor(private service: PeopleService, private cd: ChangeDetectorRef) {
    this.getNewPerson();
  }

  ngOnDestroy() {
    if (this.timer) this.timer.stop();
  }

  getNewPerson() {
    this.person = undefined;

    this.service.getRandomPerson().subscribe({
      next: (res: Person) => {
        this.person = res;
        this.renderPersonData(res);

        this.hasError = false;
        this.startAutoReload();
      },
      error: () => {
        this.hasError = true;
        this.cd.detectChanges();
      },
    });
  }

  renderPersonData(data: Person) {
    const pic = data.picture;
    this.src = pic.large || pic.medium || pic.thumbnail || this.placeholder;
    this.name = `${data.name.first} ${data.name.last}`;
  }

  startAutoReload = () => {
    this.timer = new Timer(() => {
      this.getNewPerson();
    }, INTERVAL);
  };

  pauseAutoReload() {
    if (!this.timer) return;
    this.timer.pause();
  }

  resumeAutoReload() {
    this.timer.resume();
  }
}
