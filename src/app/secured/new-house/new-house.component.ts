import {Component, Inject, OnInit, Optional} from '@angular/core';
import {House} from '../../models/House';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {Patterns} from '../../shared/helpers/patterns';

@Component({
  selector: 'app-new-house',
  templateUrl: './new-house.component.html',
  styleUrls: ['./new-house.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class NewHouseComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  local_data: any;
  postCodeMask = Patterns.POSTCODE_PATTERN;

  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<NewHouseComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: House) {
    console.log(data);
    this.local_data = data;
  }


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      shortHouseName: ['', Validators.required],
      houseName: ['', Validators.required],
      postCode: ['', Validators.required],
      city: ['', Validators.required],
      strata: ['', Validators.required],
      locationNr: ['', Validators.required],
      taxNum: ['', Validators.required],
      bankAccountNr: ['', Validators.required],
      areaOwnerShip: ['', Validators.required],
      dualAccounting: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      accountancyStartDate: ['', Validators.required],
      chequeFee: ['', Validators.required],
      proportionalCheqFee: ['', Validators.required],
      chequeFeeLiftingMonth: ['', Validators.required],
      raisedChequeFee: ['', Validators.required],
      bankCachPaymentFee: ['', Validators.required],
      handledInvoice: ['', Validators.required],
    });
  }


}
