import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {House} from '../../models/House';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class NewHouseService {

  static NEW_HOUSE_SAVE = '/houses';

  constructor(private http: HttpClient) {

  }

  save(newHouse: House) {
    return this.http.post(NewHouseService.NEW_HOUSE_SAVE, newHouse);
  }

}
