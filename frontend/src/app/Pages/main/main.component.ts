import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet , NavbarComponent , ToolbarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent { }
