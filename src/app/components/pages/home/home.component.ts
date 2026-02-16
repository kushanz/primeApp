import { Component } from '@angular/core';
import { Stats } from './widgets/stats/stats';

@Component({
  selector: 'app-home',
  imports: [Stats],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
