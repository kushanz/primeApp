import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../layoutservice/layoutservice.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  imports: [RouterModule, CommonModule,],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  items!: MenuItem[];
  layoutService = inject(LayoutService);

  toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }
}
