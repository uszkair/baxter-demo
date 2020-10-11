import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  static GET_HOUSE_LIST = '/house/all';
  static GET_HOUSE_BY_UUID = '/house';
  static NEW_HOUSE_SAVE = '/house';

  static HOUSE_ARRAY = 'houses';

  constructor() {
  }

}
