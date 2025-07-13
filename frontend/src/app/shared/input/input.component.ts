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
import {
  heroEnvelope,
  heroLockClosed,
  heroUser,
  heroUserCircle,
} from '@ng-icons/heroicons/outline';
@Component({
  selector: 'input-component',
  imports: [FormsModule, CommonModule, NgIcon],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    provideIcons({
      heroUserCircle,
      heroUser,
      heroLockClosed,
      heroEnvelope,
    }),
  ],
})
export class InputComponent {
  label = input<string>('');
  placeholder = input<string>('');
  type = input<InputType>('text');
  icon = input<IconName>();
  value: string = '';
  valueChange = output<string>();
  isReadOnly = input<boolean>(false);
  defaultValue = input<string>('');
  @ContentChild(TemplateRef) rightSlot?: TemplateRef<any>;

  ngOnInit(): void {
    this.value = this.defaultValue();
  }
  onValueChange(val: string) {
    this.value = val;
    this.valueChange.emit(this.value);
  }
  input(val: string) {
    console.log(val);
    return val;
  }
}
