import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './User';
import {TokenStorageService} from '../token-storage.service';
import {map} from 'rxjs/internal/operators';
import {Router} from '@angular/router';

const AUTH_API_SIGN_IN = '/auth/signin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  returnUrl: string;


  constructor(private http: HttpClient,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
    this.currentUserSubject = new BehaviorSubject<User>(this.tokenStorageService.getUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username, password) {
    return this.http.post<any>(AUTH_API_SIGN_IN, {username, password})
      .pipe(map(data => {
        this.tokenStorageService.saveToken(data.jwt);
        this.tokenStorageService.saveUser(data);
        this.currentUserSubject.next(data);
        this.router.navigate(['/dashboard']);
      }));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(){
    return this.currentUserValue != null;
  }

  logout() {
    this.tokenStorageService.signOut();
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
    location.reload();
  }
}
