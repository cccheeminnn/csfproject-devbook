import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginFormDetails } from '../../models/models';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreviewService } from '../../services/preview.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGrp!: FormGroup

  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private backendSvc: BackendService,
    private snackBar: MatSnackBar,
    private previewSvc: PreviewService // to display login messages in popup
  ) { }

  ngOnInit(): void {
    this.formGrp = this.fb.group({
      username: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      password: this.fb.control<string>('', [ Validators.required ])
    })
  }

  onLoginSubmit() {
    const formValue = this.formGrp.value as LoginFormDetails
    this.backendSvc.login(formValue).then(results => {
      // console.log('>>>> login results: ', results)
      // this.router.navigate(['/user', results.id, 'profile'])
      this.previewSvc.snackbarMsg = 'LOGIN_SUCCESSFUL';
      this.snackBar.openFromComponent(SnackbarComponent, {duration: 3000, verticalPosition: 'top'}); // 3000 is 3s
      this.router.navigate(['/'])
    }).catch(error => {
      // console.error('>>>> login error: ', error)
      this.previewSvc.snackbarMsg = error.error;
      this.snackBar.openFromComponent(SnackbarComponent, {duration: 3000, verticalPosition: 'top'}); // 3000 is 3s
    })
  }

}

