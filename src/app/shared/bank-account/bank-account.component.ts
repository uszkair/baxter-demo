import {Component, forwardRef, ViewChild} from '@angular/core';
import {Patterns} from '../helpers/patterns';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BankAccountComponent),
      multi: true
    }
  ]
})
export class BankAccountComponent implements ControlValueAccessor {

  @ViewChild('bankAccountNum')
  bankAccountNumInput: MatInput;
  formGroup: FormGroup;
  bankAccountNumPattern = Patterns.BANKACCOUNT;

  private onChangeCallback: (_: any) => void = (_: any) => {
  }

  constructor(private fb: FormBuilder) {
    this.createForm();

  }

  createForm() {
    this.formGroup = this.fb.group({
      bankAccountNum: [null, [Validators.required, Validators.pattern]],
    });
  }


  get bankAccountNum() {
    return this.formGroup.get('bankAccountNum');
  }

  onChange: any = () => {
  }
  onTouched: any = () => {
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    if (value) {
      // todo kötöjelessé tenni
    }

  }

  setDisabledState(isDisabled: boolean) {
    // this.disabled = isDisabled;
  }

  transformBankAccountNum(value) {
    if (value) {
      value = value.replaceAll('-', '');
    }
    this.onChangeCallback(value);
  }
}
