import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../Service/Utils/utils.service';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NavbarComponent, ToolbarComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  testWeb = true;
  constructor(public utilService: UtilsService) { }
}
