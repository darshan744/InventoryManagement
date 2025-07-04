import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  TemplateRef,
  input,
  output,
} from '@angular/core';
import { FormControl, FormsModule, NgControl } from '@angular/forms';
import { InputType } from '../../Models/UiType';
import { IconName, NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroEnvelopeSolid,
  heroLockClosedSolid,
} from '@ng-icons/heroicons/solid';
@Component({
  selector: 'input-component',
  imports: [FormsModule, CommonModule, NgIcon],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [provideIcons({ heroEnvelopeSolid, heroLockClosedSolid })],
})
export class InputComponent {
  label = input<string>('');
  placeholder = input<string>();
  type = input<InputType>();
  icon = input<IconName>();
  value: string = '';
  valueChange = output<string>();
  @ContentChild(TemplateRef) rightSlot?: TemplateRef<any>;

  onValueChange(val: string) {
    this.value = val;
    this.valueChange.emit(this.value);
  }
}
