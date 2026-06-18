import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../layoutservice/layoutservice.service';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { authUserStore } from '../../store/authuser.store';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-topbar',
  imports: [RouterModule, NgClass, ButtonModule, PopoverModule,DividerModule],
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  items!: MenuItem[];
  layoutService = inject(LayoutService);

  private authUserStore = inject(authUserStore)
  // private router = inject(Router)
  loggedUser = this.authUserStore.loggedUser;
  loading = this.authUserStore.loading;
  logoutLoading = this.authUserStore.logoutLoading;
  toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({
            ...state,
            darkTheme: !state.darkTheme
        }));
    }

    getUserInitials(name: string | undefined | null) {
        if (!name?.trim()) {
            return 'U';
        }

        const parts = name
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (parts.length === 1) {
            return parts[0].charAt(0).toUpperCase();
        }

        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }

    logout() {
        this.authUserStore.removeuser();
    }
  }

