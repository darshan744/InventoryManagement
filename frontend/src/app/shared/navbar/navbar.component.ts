import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroUserCircle,
  heroChartPie,
  heroHome,
} from '@ng-icons/heroicons/outline';
import {
  heroUserSolid,
  heroChartPieSolid,
  heroHomeSolid,
} from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-navbar',
  imports: [NgIcon, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [
    provideIcons({
      heroUserCircle,
      heroChartPie,
      heroHome,

      heroUserSolid,
      heroChartPieSolid,
      heroHomeSolid,
    }),
  ],
})
export class NavbarComponent {
  constructor(private router: Router) { }
  paths = [
    { route: 'user/inventory', icon: 'heroChartPie ' },
    { route: 'user/dashboard', icon: 'heroHome ' },
    { route: 'user/profile', icon: 'heroUserCircle ' },
  ];
  navigate(url: string): void {
    this.router.navigateByUrl('user/' + url);
  }
}
