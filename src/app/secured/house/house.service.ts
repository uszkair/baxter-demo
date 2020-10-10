import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {House} from '../../models/House';
import {PersistenceService} from "angular-persistence";

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  static GET_HOUSE_LIST = '/house/all';
  static GET_HOUSE_BY_ID = '/house'
  static NEW_HOUSE_SAVE = '/house';

  static HOUSE_ARRAY = 'houses';

  constructor(private http: HttpClient,
              private persistenceService: PersistenceService) {
  }

  getData() {
    return this.http.get<House[]>(HouseService.GET_HOUSE_LIST);
  }

  getHouseById(id) {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http.get<House>(HouseService.GET_HOUSE_BY_ID, {params: params});
  }

  update(house: House): House[] {
    let housesArray = this.persistenceService.get(HouseService.HOUSE_ARRAY) as Array<House>;

    if (!housesArray) {
      housesArray = [];
    }

    let index = housesArray.findIndex(data => data.uuid === house.uuid)

    if (index === -1) {
      housesArray.push(house);
    } else {
      housesArray[index] = house;
    }
    this.persistenceService.set(HouseService.HOUSE_ARRAY, housesArray);
    return housesArray;
  }

  save(newHouse: House) {
    return this.http.post(HouseService.NEW_HOUSE_SAVE, newHouse);
  }

}
