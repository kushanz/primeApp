
import { Component, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Popover, PopoverModule } from 'primeng/popover';
import { authUserStore } from '../../store/authuser.store';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, PopoverModule, Button],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private authUserStore = inject(authUserStore)
  private router = inject(Router)

  loggedUser = this.authUserStore.getUser();

  @ViewChild('op') op!: Popover;

    members = [
        { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' },
    ];

    toggleDD(event: any) {
        this.op.toggle(event);
    }

    logout() {
        this.authUserStore.removeuser();
        // window.location.href = '/login'; // Redirect to login page
        this.router.navigate(['login']);
    }
}
