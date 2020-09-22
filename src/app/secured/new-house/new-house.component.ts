import {Component, Inject, OnInit, Optional} from '@angular/core';
import {House} from '../../models/House';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {Patterns} from '../../shared/helpers/patterns';
import {NewHouseService} from "./new-house.service";

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
  postCodeMask = Patterns.POSTCODE;
  taxNumPattern = Patterns.TAXNUM;
  bankAccountPattern = Patterns.BANKACCOUNT;

  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<NewHouseComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: House,
              private newHouseService: NewHouseService) {
    console.log(data);
    this.local_data = data;
  }


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      shortHouseName: ['', Validators.required],
      houseName: ['Társasház', Validators.required],
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
    this.thirdFormGroup = this._formBuilder.group({
      enablingCustomerTrunk: ['', Validators.required],
      customerTrunkAddressManagement: ['', Validators.required],
      enablingCarrierTrunk: ['', Validators.required],
      supplierTrunkAddressManagement: ['', Validators.required],
      overViewbuyerSupplier: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      delegatePersonName: ['', Validators.required],
      delegatePersonTitle: ['', Validators.required],
      delegatePersonNamePhoneNr: ['', Validators.required]
    });
  }


  save() {
    const result = Object.assign({},
      this.firstFormGroup.value,
      this.secondFormGroup.value,
      this.thirdFormGroup.value,
      this.fourthFormGroup.value);
    this.newHouseService.save(result).subscribe();
  }

}
