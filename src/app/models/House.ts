export interface House {

  uuid: string; // egyedi objektum azonosito
  shortHouseName: string; // Ház rövid neve (azonosító)
  houseName: string; // Ház neve
  postCode: string; // Irányítószám
  city: string; // Város
  strata: string; // Utca, házszám
  locationNr: string; // Helyrajzi szám
  taxNum: string; // Adószám
  bankAccountNr: string; // Üzemelt.Banksz.Listán
  areaOwnerShip: string; // Össz négyzetméter/tulajdoni hányad
  dualAccounting: string; // Kettős könyvitel

  accountancyStartDate: string; // Könyvelés kezdő hónapja
  chequeFee: number; // Csekkdíj
  proportionalCheqFee: number; // Összegarányos csekkdíj
  chequeFeeLiftingMonth: number; // Csekkdíj emelés hónapja
  raisedChequeFee: number; // Emelt csekkdíj
  bankCachPaymentFee: number; // Banki készpénzbefizetés díja
  handledInvoice: boolean; // Csak folyamatos teljesítésű számlákat könyvel?

  enablingCustomerTrunk: boolean; // Vevőtörzs engedélyezése
  customerTrunkAddressManagement: boolean; // Vevőtörzs címkezelés
  enablingCarrierTrunk: boolean; // Szállítótörzs engedélyezése
  supplierTrunkAddressManagement: boolean; // Szállítótörzs címkezelés
  overViewbuyerSupplier: boolean; // Áttekintésben legyen-e vevő/szállító név

  delegatePersonName: string; // Közösképviselő neve
  delegatePersonTitle: string; // Közösképviselő titulusa
  delegatePersonNamePhoneNr: string; // Közösképviselő telefonszáma
}
