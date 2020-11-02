import {SubDeposit} from './SubDeposit';

export interface Meter {
  seriesNr: string;
  mainMeters: string;
  installationTime: string;
  installationPosition: string;
  actualPosition: string;
  decommissioningTime: string;
  decommissioningPosition: string;
  expirationTime: string;
}
