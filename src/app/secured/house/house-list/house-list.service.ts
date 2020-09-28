import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {House} from '../../../models/House';


const GET_HOUSE_LIST = '/houses/all';


@Injectable({
  providedIn: 'root'
})
export class HouseListService {

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get<House[]>(GET_HOUSE_LIST);
  }
}
