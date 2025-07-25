import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Inventory Management System';
  ngOnInit() {
    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const localStorageTheme = localStorage.getItem('dark');
    if (localStorageTheme) {
      const localTheme = Boolean(JSON.parse(localStorageTheme));
      isDarkMode = localTheme;
    }
    console.log('Dark mode:', isDarkMode);
    const html = document.querySelector('html');
    html?.classList.toggle('dark', isDarkMode);
  }
}
