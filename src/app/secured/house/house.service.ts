import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {House} from '../../models/House';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  static GET_HOUSE_LIST = '/house/all';
  static GET_HOUSE_BY_ID = '/house'

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get<House[]>(HouseService.GET_HOUSE_LIST);
  }

  getHouseById(id) {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http.get<House>(HouseService.GET_HOUSE_BY_ID, {params: params});
  }
}
