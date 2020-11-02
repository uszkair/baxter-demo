import {Injectable} from '@angular/core';
import {House} from '../../models/House';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/Rx';
import {map} from 'rxjs/operators';
import {Observable, of, ReplaySubject} from 'rxjs';
import {PersistenceService} from 'angular-persistence';

const ADDED_HOUSES = 'HOUSES';
const GET_HOUSE_LIST = '/house/all';
const BASE_HOUSE_URL = '/house';

@Injectable({
  providedIn: 'root'
})
export class HouseDataService {

  private dataStore: { houses: House[] } = {houses: []};

  private houseSub = new BehaviorSubject<House>(null);
  readonly selectedHouse$ = this.houseSub.asObservable();

  constructor(private http: HttpClient,
              private persistenceService: PersistenceService) {

    if (!this.persistenceService.get(ADDED_HOUSES)){
      this.persistenceService.set(ADDED_HOUSES, this.dataStore);
    }
  }

  getHouse(uuid){
    return this.http.get<House>(`${BASE_HOUSE_URL}?uuid=${uuid}`);
  }

  loadAll() {
    return this.http.get<House[]>(GET_HOUSE_LIST);
  }

  load(house: House): Observable<any>{
    let notFound = true;
    let selectedIndex = 0;

    this.dataStore = this.persistenceService.get(ADDED_HOUSES);

    this.dataStore.houses.forEach((item, index) => {
      if (item.uuid === house.uuid) {
        selectedIndex = index;
        this.dataStore.houses[index] = house;
        notFound = false;
      }
    });
    if (notFound) {
      this.dataStore.houses.push(house);
      selectedIndex = this.dataStore.houses.length - 1;
    }
    this.persistenceService.set(ADDED_HOUSES, this.dataStore);
    this.houseSub.next(house);

    return of(selectedIndex);
  }

  create(house: House) {
    this.http
      .post<House>(`${BASE_HOUSE_URL}`, JSON.stringify(house));
  }

  get housesDS() {
    return this.dataStore;
  }

  update(house: House) {
    return this.http
      .post<House>(`${BASE_HOUSE_URL}`, JSON.stringify(house))
      .pipe(
        map(data => {
          this.dataStore.houses.forEach((t, i) => {
            if (t.uuid === data.uuid) {
              this.dataStore.houses[i] = data;
            }
          });
        }));
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
}
