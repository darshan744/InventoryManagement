import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../Service/Utils/utils.service';

@Component({
  selector: 'app-toolbar',
  imports: [NavbarComponent , CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  constructor(public util : UtilsService) {
  }
}
