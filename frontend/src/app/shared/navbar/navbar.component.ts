import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
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
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
