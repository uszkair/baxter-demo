import {Component, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/services/auth/auth.service";
import {TokenStorageService} from "../shared/services/token-storage.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  errorMessage = '';


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  async ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {

    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    try {
      this.authService.login(this.form).subscribe(data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.reloadPage();
        }
      );
    } catch (err) {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    }
  }

  reloadPage() {
    window.location.reload();
  }
}
