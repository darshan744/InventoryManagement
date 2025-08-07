import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { BadgeModule } from 'primeng/badge';
import { CartService } from '../../Service/Cart/cart.service';
import { UtilsService } from '../../Service/Utils/utils.service';
@Component({
  selector: 'app-navbar',
  imports: [
    BadgeModule,
    OverlayBadgeModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    AsyncPipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router , private cart : CartService , public util : UtilsService) { }
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
  get cartLen() {
    return this.cart.cartLen$;
  }
}
