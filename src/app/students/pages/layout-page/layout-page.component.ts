import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  public sidebarItems = [
    { label: 'Students', icon: 'group', url: './list' },
    { label: 'Add', icon: 'person_add', url: './new' },
    { label: 'Search', icon: 'person_search', url: './search' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get user():User | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
