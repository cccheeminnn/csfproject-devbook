import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginFormDetails } from '../../models/models';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { SharedService } from '../../services/shared.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading!: boolean;

  formGrp!: FormGroup

  // for show password
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _location: Location,
    private backendSvc: BackendService,
    private snackBar: MatSnackBar,
    private sharedSvc: SharedService) { // to display login messages in popup
    }

  ngOnInit(): void {
    if (this.router.url.includes("verified")) {
      this.sharedSvc.displayMessage('EMAIL_VERIFIED', 'greenyellow');
      this.snackBar.openFromComponent(SnackbarComponent, {duration: 3000, verticalPosition: 'top'}); // 3000 is 3s
    }
    this.formGrp = this.fb.group({
      username: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      password: this.fb.control<string>('', [ Validators.required ])
    })
  }

  onLoginSubmit() {
    this.loading = true;

    const formValue = this.formGrp.value as LoginFormDetails
    this.backendSvc.login(formValue).then(results => {
      // console.log('>>>> login results: ', results)
      this.loading = false;
      this.backendSvc.getNewNotificationsCount(results.email);
      this.sharedSvc.displayMessage('LOGIN_SUCCESSFUL', 'greenyellow');
      this.snackBar.openFromComponent(SnackbarComponent, {duration: 3000, verticalPosition: 'top'}); // 3000 is 3s
      this._location.back();
      // this.router.navigate(['/'])
    }).catch(error => {
      // console.error('>>>> login error: ', error)
      this.loading = false;
      this.sharedSvc.displayMessage('INVALID_CREDENTIALS', 'hotpink');
      this.snackBar.openFromComponent(SnackbarComponent, {duration: 3000, verticalPosition: 'top'}); // 3000 is 3s
    })
  }

}

