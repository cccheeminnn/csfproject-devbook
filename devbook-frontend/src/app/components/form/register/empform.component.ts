import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/services/shared.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-form',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.css']
})
export class EmpformComponent implements OnInit {

  loading!: boolean;

  // for email
  @ViewChild('email')
  emailHTMLEle!: ElementRef;
  emailError = false;

  // for password field toggle visibility
  hide: boolean = true;

  // for form
  formGrp!: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private sharedSvc: SharedService,
    private backendSvc: BackendService) {

    this.loading = true;
  }

  ngAfterViewInit(): void {
    this.loading = false;
  }

  ngOnInit(): void {

    this.formGrp = this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
      profilePhoto: [null], // inserted during input (change) event
    })

  }

  onSubmit() {
    this.loading = true;
    // create a new formData
    let formData = new FormData();
    // iterate through all keys in our FormGroup
    Object.keys(this.formGrp.controls).forEach(formControlName => {
      formData.append(formControlName, this.formGrp.get(formControlName)?.value)
    })

    this.backendSvc.registerEmp(formData).then(result => {
      // console.log('>>>> postRegister response: ', result)
      this.loading = false;
      this.sharedSvc.displayMessage('REGISTRATION_SUCCESSFUL', 'greenyellow')
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' }); // 3000 is 3s
      this.router.navigate(['/login'])
    }).catch(error => {
      // console.log('>>>> postRegister response: ', error);
      this.loading = false;
      if ((<string>(error.error.message)).match('exist')) {
        this.emailHTMLEle.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' })
        this.emailError = true;
      }
    })
  }

  // check type of selected file for upload
  errorProfilePhoto: boolean = false; // profile picture
  readFileType(fileEvent: HTMLInputEvent) {
    // blank file to reset svc var
    const blankFile: File = new File([], '');

    // receives the file selected
    const inputFile: File = fileEvent.target.files![0];

    var reader = new FileReader();
    try {
      // console.log('>>>> selected fileType: ', inputFile);
      // user uploaded the correct file type image/jpeg or image/png
      if (inputFile.type.startsWith('image') && inputFile.size < 1048576) {
        reader.readAsDataURL(inputFile);
        // onload is fired when file is read successfully
        reader.onload = (event: any) => {
          this.errorProfilePhoto = false;
          this.formGrp.controls['profilePhoto'].setValue(inputFile);
        }
      } else {
        // user uploaded the wrong file type, not image/*
        this.errorProfilePhoto = true;
        this.formGrp.controls['profilePhoto'].reset();
      }
    } catch (error) {
      // occurs if user did not select any file and close dialog box
      this.errorProfilePhoto = false;
      this.formGrp.controls['profilePhoto'].reset();
    }

  }

}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
