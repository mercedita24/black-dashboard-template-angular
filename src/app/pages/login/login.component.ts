import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario = new User();
  errorCredenciales: Boolean = false;
  loading: Boolean = false;
  imagenServerUrl: string = environment.imagenServerUrl;

  constructor(
      private _auth: AuthService,
      private _router: Router
  ) {

  }

  ngOnInit() {
  }

  login() {
      this.loading = true;
      this._auth.login(this.usuario).subscribe(
          response => {
              this._auth.handleToken(response.token);
              localStorage.setItem('useremail', response.email);
              this.loading = false;
              if (response.token) {
                  this._router.navigateByUrl('/dashboard');
              } else {
                  this._router.navigateByUrl('/auth/login');
              }
          },
          error => {
              this.loading = false;

              if (error.status == 401) {
                  this.loading = false;
                  this.errorCredenciales = true;
              }
          })
  }

  close() {
      this.errorCredenciales = false;
      this.usuario = new User();
  }

}
