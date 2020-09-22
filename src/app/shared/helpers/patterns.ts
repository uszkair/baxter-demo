export class Patterns {
 static POSTCODE = [/[1-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
 static TAXNUM = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /[1-5]/, '-', /\d/, /\d/];
  static BANKACCOUNT = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

}
