import {Partner} from './Partner';
import {Tenant} from './Tenant';
import {Meter} from './Meter';
import {Accessories} from './Accessories';

export interface SubDeposit {
  houseUuid: string;
  code: number;
  floor: string;
  albeteCode: string;
  staircase: string;
  ownership: number;
  area: number;
  airCubicMeters: number;
  numberOfInhabitants: number;
  dateOfPurchase: string;
  dateOfSale: string;
  waterMeter: string;
  subTopographicalNumber: string;
  comments: string;
  referenceCode: string;
  utilityMissed: boolean;
  owner: Partner;
  coOwners: Partner[];
  tenants: Tenant[];
  meters: Meter[];
  accessories: Accessories[];
  company: boolean;
}
