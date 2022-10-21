import { Component, OnInit, ViewChild } from '@angular/core';
import { DevbookUser } from '../../models/models';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { PreviewService } from '../../services/preview.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  // for Expand/Collaspe all
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  // for password field toggle visibility
  hide: boolean = true;

  currentUser!: DevbookUser | null;
  currentUserId!: string;

  user!: DevbookUser;
  userId: string = this.activatedRoute.snapshot.params['id'];

  formGrp!: FormGroup;
  skillsArray!: FormArray;
  websitesArray!: FormArray;

  constructor(
    private fb: FormBuilder,
    private backendSvc: BackendService,
    private previewSvc: PreviewService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    backendSvc.currentUser.subscribe(x =>this.currentUser = x)
  }

  ngOnInit(): void {
    if (this.currentUser == null || this.currentUser.id != this.userId) {
      this.backendSvc.logout();
      this.router.navigate(['/login'])
    } else {
      this.currentUserId = this.currentUser!.id;

      this.backendSvc.retrieveUserDetails(this.userId).then(result => {
        this.user = result;
      })

      this.skillsArray = this.fb.array([]);
      this.websitesArray = this.fb.array([]);
      this.formGrp = this.fb.group ({
        profilePhoto: [null], // inserted during input (change) event
        bio: this.fb.control<string>('', [ Validators.required, Validators.minLength(10) ]),
        currentJob: this.fb.control<string>(''),
        currentCompany: this.fb.control<string>(''),
        previousCompany: this.fb.control<string>(''),
        education: this.fb.control<string>('', [ Validators.required ]),
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
  }

  saveFirstPanel() {

  }

  saveSecondPanel() {

  }

  saveThirdPanel() {

  }

  saveFourthPanel() {

  }

  saveFifthPanel() {

  }


  pushSkillsArray() {

  }

  pushWebsitesArray() {

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
      if (inputFile.type.startsWith('image')) {
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
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
