import {SubDeposit} from './SubDeposit';
import {PartnerRole} from './PartnerRole';

export interface Partner {
  name: string;
  phone: string;
  emailAddress: string;
  existsEmail: boolean;
  coOwnershipRatio: number;
  letterName: string;
  postCode: number;
  city: string;
  strName: string;
  comment: string;
  role: PartnerRole;
  bankTransfer: boolean;
  szvb: boolean;
}
