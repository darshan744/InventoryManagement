import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { UiButton, UiButtonSize, UiIcon } from '../../Models/UiType';

@Component({
  selector: 'button-component',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  type = input<string>('button');
  variant = input<UiButton>('contrast');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  size = input<UiButtonSize>('sm');

  get classes(): string {
    const variants: Record<string, string> = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      danger: 'bg-red-600 text-white hover:bg-red-700',
      warn: 'bg-yellow-500 text-black hover:bg-yellow-600',
      outline:
        'border border-input bg-transparent hover:bg-muted text-foreground',
      ghost: 'bg-transparent hover:bg-muted text-foreground',
      contrast: 'bg-black text-white hover:bg-neutral-800',
    };
    const size: Record<string, string> = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'h-10 w-10 p-0',
    };
    const variantResult = variants[this.variant()];
    const sizeResult = size[this.size()];
    const result = ` ${variantResult} ${sizeResult}`;
    return result;
  }
}
