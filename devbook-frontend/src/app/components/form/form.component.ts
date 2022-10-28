import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { PreviewComponent } from './preview.component';
import { PreviewService } from '../../services/preview.service';
import { BackendService } from 'src/app/services/backend.service';
import { DevbookUser } from '../../models/models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {

  currentUser!: DevbookUser | null;
  loading!: boolean;

  // for Expand/Collaspe all
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  // for email
  @ViewChild('email')
  emailHTMLEle!: ElementRef;
  emailError = false;

  // for password field toggle visibility
  hide: boolean = true;

  // for form
  formGrp!: FormGroup;
  skillsArray!: FormArray;
  websitesArray!: FormArray;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog, // for Preview
    private previewSvc: PreviewService,
    private backendSvc: BackendService) {

    this.loading = true;
  }

  ngAfterViewInit(): void {
    this.loading = false;
  }

  ngOnInit(): void {
    this.skillsArray = this.fb.array([], [Validators.required, Validators.minLength(1)]);
    this.websitesArray = this.fb.array([], [Validators.required, Validators.minLength(1)]);

    this.formGrp = this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
      profilePhoto: [null], // inserted during input (change) event
      bio: this.fb.control<string>('', [Validators.required, Validators.minLength(10)]),
      currentJob: this.fb.control<string>(''),
      currentCompany: this.fb.control<string>(''),
      previousCompany: this.fb.control<string>(''),
      education: this.fb.control<string>('', [Validators.required]),
      skills: this.skillsArray,
      websites: this.websitesArray,
      file01: [null], // inserted during input (change) event
      file01Description: this.fb.control<string>(''),
      file02: [null], // inserted during input (change) event
      file02Description: this.fb.control<string>(''),
      file03: [null], // inserted during input (change) event
      file03Description: this.fb.control<string>('')
    })
  }

  pushSkillsArray() {
    const skillsArrayCtrl = this.fb.group({
      name: this.fb.control<string>('', [Validators.maxLength(15)]),
      rating: this.fb.control<number>(1, [])
    })
    this.skillsArray.push(skillsArrayCtrl);
  }
  deleteSkill(idx: number) {
    this.skillsArray.removeAt(idx)
  }

  pushWebsitesArray() {
    const websitesArrayCtrl = this.fb.group({
      name: this.fb.control<string>('', [Validators.maxLength(15)]),
      url: this.fb.control<string>('', [])
    })
    this.websitesArray.push(websitesArrayCtrl);
  }
  deleteWebsite(idx: number) {
    this.websitesArray.removeAt(idx)
  }

  openPreview() {
    this.previewSvc.formGrp = this.formGrp;
    const previewRef = this.dialog.open(PreviewComponent);

    previewRef.afterClosed().subscribe(result => {
      // console.log('>>>> preview closed: ', result);
    })
  }

  onSubmit() {
    this.loading = true;
    this.previewSvc.reset();
    // since some of the file uploads are optional
    // check value for these form controls and if they are null (default)
    // throw in a blank File so backend MultipartFile does not give us error
    const blankFile: File = new File([], '');
    // recall whenever user input wrong file or never select any file we reset control value
    if (this.formGrp.controls['file01'].value === null) {
      this.formGrp.controls['file01'].setValue(blankFile);
    }
    if (this.formGrp.controls['file02'].value === null) {
      this.formGrp.controls['file02'].setValue(blankFile);
    }
    if (this.formGrp.controls['file03'].value === null) {
      this.formGrp.controls['file03'].setValue(blankFile);
    }
    // create a new formData
    let formData = new FormData();
    // iterate through all keys in our FormGroup
    Object.keys(this.formGrp.controls).forEach(formControlName => {
      // skills and websites are array, have to JSON.stringify to extract out actual value
      if (formControlName.match('skills') || formControlName.match('websites')) {
        // append key value pair to formData
        formData.append(formControlName, JSON.stringify(this.formGrp.get(formControlName)?.value).replace("\\", ""))
      } else {
        formData.append(formControlName, this.formGrp.get(formControlName)?.value)
      }
    })

    this.backendSvc.register(formData).then(result => {
      // console.log('>>>> postRegister response: ', result)
      this.loading = false;
      this.previewSvc.snackbarMsg = 'REGISTER_SUCCESSFUL';
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
  errorFile01: boolean = false; // showcase picture 1
  errorFile02: boolean = false; // showcase picture 2
  errorFile03: boolean = false; // showcase picture 3
  errorProfilePhoto: boolean = false; // profile picture
  readFileType(fileEvent: HTMLInputEvent) {
    // blank file to reset svc var
    const blankFile: File = new File([], '');

    // receives the file selected
    const inputFile: File = fileEvent.target.files![0];

    // checks which input html tag (change) originated from
    let elementId = fileEvent.target.id;

    var reader = new FileReader();
    try {
      // console.log('>>>> selected fileType: ', inputFile);
      // user uploaded the correct file type image/jpeg or image/png
      if (inputFile.type.startsWith('image') && inputFile.size < 1048576) {
        reader.readAsDataURL(inputFile);
        // onload is fired when file is read successfully
        reader.onload = (event: any) => {
          if (elementId === 'inputFile01') {
            // switch the error msg to false
            this.errorFile01 = false;
            // event.target.result will give us the base64 encoded image
            // which we will use to display the image
            this.previewSvc.file01 = event.target.result;
            // we will then set the actual file to the respective control
            // when it hits the backend we retrieve it by MultipartFile
            this.formGrp.controls['file01'].setValue(inputFile);
            // show 2nd upload input
          } else if (elementId === 'inputFile02') {
            this.errorFile02 = false;
            this.previewSvc.file02 = event.target.result;
            this.formGrp.controls['file02'].setValue(inputFile);
          } else if (elementId === 'inputFile03') {
            this.errorFile03 = false;
            this.previewSvc.file03 = event.target.result;
            this.formGrp.controls['file03'].setValue(inputFile);
          } else if (elementId === 'inputProfilePhoto') {
            this.errorProfilePhoto = false;
            this.previewSvc.profilePhoto = event.target.result;
            this.formGrp.controls['profilePhoto'].setValue(inputFile);
          }
        }
      } else {
        // user uploaded the wrong file type, not image/*
        if (elementId === 'inputFile01') {
          // set error msg to true
          this.errorFile01 = true;
          // reason why we reset is because user might had already the selected correct file
          // then either select the wrong file after or close the dialog box so no file selected
          // reset svc so preview resets
          this.previewSvc.file01 = blankFile;
          // reset formGrp controls
          this.formGrp.controls['file01'].reset();
        } else if (elementId === 'inputFile02') {
          this.errorFile02 = true;
          this.previewSvc.file02 = blankFile;
          this.formGrp.controls['file02'].reset();
        } else if (elementId === 'inputFile03') {
          this.errorFile03 = true;
          this.previewSvc.file03 = blankFile;
          this.formGrp.controls['file03'].reset();
        } else if (elementId === 'inputProfilePhoto') {
          this.errorProfilePhoto = true;
          this.previewSvc.profilePhoto = blankFile;
          this.formGrp.controls['profilePhoto'].reset();
        }

      }
    } catch (error) {
      // occurs if user did not select any file and close dialog box
      if (elementId === 'inputFile01') {
        // switch the error msg to false
        this.errorFile01 = false;
        // reset svc so preview resets
        this.previewSvc.file01 = blankFile;
        // reset formGrp controls
        this.formGrp.controls['file01'].reset();
      } else if (elementId === 'inputFile02') {
        this.errorFile02 = false;
        this.previewSvc.file02 = blankFile;
        this.formGrp.controls['file02'].reset();
      } else if (elementId === 'inputFile03') {
        this.errorFile03 = false;
        this.previewSvc.file03 = blankFile;
        this.formGrp.controls['file03'].reset();
      } else if (elementId === 'inputProfilePhoto') {
        this.errorProfilePhoto = false;
        this.previewSvc.profilePhoto = blankFile;
        this.formGrp.controls['profilePhoto'].reset();
      }
    }

  }

  dataURItoBlob(dataURI: string) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }

}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
