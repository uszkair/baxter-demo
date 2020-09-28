import {Component, forwardRef, ViewChild} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {Patterns} from '../helpers/patterns';

@Component({
  selector: 'app-tax-num',
  templateUrl: './tax-num.component.html',
  styleUrls: ['./tax-num.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TaxNumComponent),
      multi: true
    }
  ]
})
export class TaxNumComponent implements ControlValueAccessor {

  @ViewChild('taxNum')
  taxNumInput: MatInput;
  formGroup: FormGroup;
  taxNumPattern = Patterns.TAXNUM;

  private onChangeCallback: (_: any) => void = (_: any) => {
  }

  constructor(private fb: FormBuilder) {
    this.createForm();

  }

  createForm() {
    this.formGroup = this.fb.group({
      taxNum: [null, [Validators.required, Validators.pattern]],
    });
  }


  get taxNum() {
    return this.formGroup.get('taxNum');
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
    if (value){
      // todo kötöjelessé tenni
    }

  }

  setDisabledState(isDisabled: boolean) {
    // this.disabled = isDisabled;
  }

  transformTaxNum(value) {
    if (value) {
      value = value.replaceAll('-', '');
    }
    this.onChangeCallback(value);
  }
}
