import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'toggle-icon-component',
  imports: [],
  templateUrl: './toggle-icon.component.html',
  styleUrl: './toggle-icon.component.css',
})
export class ToggleIconComponent {
  @Input() visible = false;
  @Output() toggle = new EventEmitter<void>();

  onClick() {
    this.toggle.emit();
  }
}
