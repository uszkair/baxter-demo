import {Injectable} from '@angular/core';
import {House} from '../../models/House';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class HouseDataService {
  static GET_HOUSE_LIST = '/house/all';
  static BASE_HOUSE_URL = '/house';

  private _housesSub = new BehaviorSubject<House[]>([]);
  private dataStore: { houses: House[] } = {houses: []};
  readonly houses = this._housesSub.asObservable();

  constructor(private http: HttpClient) {
  }

  loadAll() {

    this.http.get<House[]>(HouseDataService.GET_HOUSE_LIST)
      .pipe().subscribe( (data: House[]) => {
      this.dataStore.houses = data;
      this._housesSub.next(Object.assign({}, this.dataStore).houses);
    });
  }

  load(uuid: number | string) {
    this.http.get<House>(`${HouseDataService.BASE_HOUSE_URL}/${uuid}`)
      .pipe()
      .subscribe(
      data => {
        let notFound = true;

        this.dataStore.houses.forEach((item, index) => {
          if (item.uuid === data.uuid) {
            this.dataStore.houses[index] = data;
            notFound = false;
          }
        });

        if (notFound) {
          this.dataStore.houses.push(data);
        }

        this._housesSub.next(Object.assign({}, this.dataStore).houses);
      });
  }


  create(house: House) {
    this.http
      .post<House>(`${HouseDataService.BASE_HOUSE_URL}`, JSON.stringify(house))
      .pipe()
      .subscribe((data: House) => {
        this.dataStore.houses.push(data);
        this._housesSub.next(Object.assign({}, this.dataStore).houses);
      });
  }

  update(house: House) {
    this.http
      .put<House>(`${HouseDataService.BASE_HOUSE_URL}/${house.uuid}`, JSON.stringify(house))
      .pipe()
      .subscribe((data: House) => {
      this.dataStore.houses.forEach((t, i) => {
        if (t.uuid === data.uuid) {
          this.dataStore.houses[i] = data;
        }
      });
      this._housesSub.next(Object.assign({}, this.dataStore).houses);
    });
  }

  // remove(uuid: number) {
  //   this.http.delete(`${HouseDataService.BASE_HOUSE_URL}/${uuid}`).subscribe(
  //     response => {
  //       this.dataStore.houses.forEach((t, i) => {
  //         if (t.uuid === uuid) {
  //           this.dataStore.houses.splice(i, 1);
  //         }
  //       });
  //
  //       this._housesSub.next(Object.assign({}, this.dataStore).houses);
  //     },
  //     error => console.log('Could not delete house.')
  //   );
  // }

  get housesSub() {
    return this._housesSub.asObservable();
  }
}
