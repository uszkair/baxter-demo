import {Component, Inject, OnInit, Optional} from '@angular/core';
import {House} from '../../../models/House';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {Patterns} from '../../../shared/helpers/patterns';
import {HouseService} from "../house.service";

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
  bankAccountPattern = Patterns.BANKACCOUNT;

  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<NewHouseComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: House,
              private newHouseService: HouseService) {
    console.log(data);
    this.local_data = data;
  }


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      shortHouseName: [null, Validators.required],
      houseName: ['Társasház', Validators.required],
      postCode: [null, Validators.required],
      city: [null, Validators.required],
      strata: [null, Validators.required],
      locationNr: [null],
      taxNum: [null],
      bankAccountNum: [null, Validators.required],
      areaOwnerShip: [null],
      dualAccounting: [null],
    });
    this.secondFormGroup = this._formBuilder.group({
      accountancyStartDate: ['Jan', Validators.required],
      chequeFee: [0, Validators.required],
      proportionalCheqFee: [null, Validators.required],
      chequeFeeLiftingMonth: [null, Validators.required],
      refusedChFeeLiftingMonth: [null],
      raisedChequeFee: [null, Validators.required],
      bankCachPaymentFee: [null, Validators.required],
      handledInvoice: [null, Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      enablingCustomerTrunk: [null],
      customerTrunkAddressManagement: [null],
      enablingCarrierTrunk: [null],
      supplierTrunkAddressManagement: [null],
      overViewbuyerSupplier: [null]
    });
    this.fourthFormGroup = this._formBuilder.group({
      delegatePersonName: [null, Validators.required],
      delegatePersonTitle: [null],
      delegatePersonNamePhoneNr: [null, Validators.required]
    });


    this.secondFormGroup.get('refusedChFeeLiftingMonth')
      .valueChanges
      .subscribe((value) => {
        if (value) {
          this.secondFormGroup.get('chequeFeeLiftingMonth').patchValue(null);
          this.secondFormGroup.get('chequeFeeLiftingMonth').disable();
        } else {
          this.secondFormGroup.get('chequeFeeLiftingMonth').enable();
        }
      });
  }


  save() {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid && this.fourthFormGroup.valid) {
      const result = Object.assign({},
        this.firstFormGroup.value,
        this.secondFormGroup.value,
        this.thirdFormGroup.value,
        this.fourthFormGroup.value);
      this.newHouseService.save(result)
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }

}
