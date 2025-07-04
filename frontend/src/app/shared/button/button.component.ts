import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-component',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
}
