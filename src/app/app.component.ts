import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { authUserStore } from './store/authuser.store';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Auth APP Laravel';
  private authStore = inject(authUserStore);

  constructor() {
    this.authStore.loadCurrentUser();
  }
}
