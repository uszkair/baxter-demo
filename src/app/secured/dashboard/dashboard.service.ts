import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {House} from '../../models/House';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  static housesAllUrl = '/houses/all';

  constructor(private http: HttpClient) {
  }


  get loadAllHouses(): Observable<House[]> {
    return this.http.get<House[]>(DashboardService.housesAllUrl);
  }

}
