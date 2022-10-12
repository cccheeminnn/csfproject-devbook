import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { PreviewComponent } from './preview.component';
import { PreviewService } from '../../services/preview.service';
import { Registration } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // for Expand/Collaspe all 
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  // for password field toggle visibility
  hide:boolean = true;

  formGrp!: FormGroup;
  skillsArray!: FormArray;
  websitesArray!: FormArray;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog, // for Preview
    private previewSvc: PreviewService,
    private backendSvc: BackendService) { }

  ngOnInit(): void {
    this.skillsArray = this.fb.array([]);
    this.websitesArray = this.fb.array([]);

    this.formGrp = this.fb.group({
      name: this.fb.control<string>('', [ Validators.required ]),
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
      password: this.fb.control<string>('', [ Validators.required, Validators.minLength(8) ]),
      profilePhoto: this.fb.control(null),
      bio: this.fb.control<string>('', [ Validators.required, Validators.minLength(10) ]),
      currentJob: this.fb.control<string>(''),
      currentCompany: this.fb.control<string>(''),
      previousCompany: this.fb.control<string>(''),
      education: this.fb.control<string>('', [ Validators.required ]),
      skills: this.skillsArray,
      websites: this.websitesArray,
      file01: [null], // inserted via FormData upon submit
      file01Description: this.fb.control<string>(''),
      file02: this.fb.control(''), // inserted via FormData upon submit
      file02Description: this.fb.control<string>(''),
      file03: this.fb.control(''), // inserted via FormData upon submit
      file03Description: this.fb.control<string>('')
    })
  }

  pushSkillsArray() {
    const skillsArrayCtrl = this.fb.group({
      name: this.fb.control<string>('', [ Validators.maxLength(10) ]),
      rating: this.fb.control<number>(1, [ ])
    })
    this.skillsArray.push(skillsArrayCtrl);
  }
  deleteSkill(idx: number) {
    this.skillsArray.removeAt(idx)
  }

  pushWebsitesArray() {
    const websitesArrayCtrl = this.fb.group({
      name: this.fb.control<string>('', [ Validators.maxLength(10) ]),
      url: this.fb.control<string>('', [ ])
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
      console.log('>>>> preview closed: ', result);
    })
  }

  onSubmit() {
    if (this.previewSvc.file01 != null) {
      const blob = this.dataURItoBlob(<string>(<unknown>this.previewSvc.file01))
      const formData = new FormData();
      formData.set('showcaseImg01', blob, 'image01.jpg'); // set overwrites existing key
      this.formGrp.controls['file02'].setValue(formData);
    }
    if (this.previewSvc.file02 != null) {
      const blob = this.dataURItoBlob(<string>(<unknown>this.previewSvc.file02))
      const formData = new FormData();
      formData.set('showcaseImg02', blob, 'image02.jpg'); // set overwrites existing key
      this.formGrp.controls['file02'].setValue(formData);
    } else {
      const file: File = new File([],'');
      this.formGrp.controls['file02'].setValue(file)
    }
    if (this.previewSvc.file03 != null) {
      const blob = this.dataURItoBlob(<string>(<unknown>this.previewSvc.file03))
      const formData = new FormData();
      formData.set('showcaseImg03', blob, 'image03.jpg'); // set overwrites existing key
      this.formGrp.controls['file03'].setValue(formData);
    }
    if (this.previewSvc.profilePhoto != null) {
      const blob = this.dataURItoBlob(<string>(<unknown>this.previewSvc.profilePhoto))
      const formData = new FormData();
      formData.set('profileImg', blob, 'profileImage.jpg'); // set overwrites existing key
      this.formGrp.controls['profilePhoto'].setValue(formData);
    }

    const form: Registration = this.formGrp.value as Registration;
    console.log('>>>> form ', form);

    let formData = new FormData();
    Object.keys(this.formGrp.controls).forEach(formControlName => {
      console.log('>>>> ', formControlName)
      console.log('>>>> ', this.formGrp.get(formControlName)?.value)
      if(formControlName.match('skills')) {
        formData.append(formControlName, JSON.stringify(this.formGrp.get(formControlName)?.value).replace("\\",""))
      } else {
        formData.append(formControlName, this.formGrp.get(formControlName)?.value)
      }
    })

    this.backendSvc.register(formData).then(result => {
      console.log('>>>> postRegister response: ', result)
    })
  }

  // check type of selected file for upload
  errorFile01:boolean = false; // showcase picture 1
  errorFile02:boolean = false; // showcase picture 2
  errorFile03:boolean = false; // showcase picture 3
  errorProfilePhoto:boolean = false; // profile picture
  readFileType(fileEvent: HTMLInputEvent) {
    const file: File = fileEvent.target.files![0];
    let elementId = fileEvent.target.id;

    var reader = new FileReader();
    console.info('>>>fileType ', typeof file)
    if (typeof file != 'undefined'){
      reader.readAsDataURL(file!)
      if (!file.type.startsWith('image')) {
        if (elementId === 'inputGroupFile01') {
          this.errorFile01 = true;
        } else if (elementId === 'inputGroupFile02') {
          this.errorFile02 = true;
        } else if (elementId === 'inputGroupFile03') {
          this.errorFile03 = true;
        } else if (elementId === 'inputProfilePhoto') {
          this.errorProfilePhoto = true;
        }
      } else {
        if (elementId === 'inputGroupFile01') {
          this.errorFile01 = false;
          reader.onload = (event:any) => {
            this.previewSvc.file01 = event.target.result;
            this.formGrp.controls['file01'].setValue(file)
            // this.formGrp.get('file01')?.updateValueAndValidity();
          }
        } else if (elementId === 'inputGroupFile02') {
          this.errorFile02 = false;
          reader.onload = (event:any) => {
            this.previewSvc.file02 = event.target.result;
          }
        } else if (elementId === 'inputGroupFile03') {
          this.errorFile03 = false;
          reader.onload = (event:any) => {
            this.previewSvc.file03 = event.target.result;
          }
        } else if (elementId === 'inputProfilePhoto') {
          this.errorProfilePhoto = false;
          reader.onload = (event:any) => {
            this.previewSvc.profilePhoto = event.target.result;
          }
        }
      }
    } else {
      if (elementId === 'inputGroupFile01') {
        this.errorFile01 = false;
        this.previewSvc.file01 = new File([],'',undefined);
      } else if (elementId === 'inputGroupFile02') {
        this.errorFile02 = false;
        this.previewSvc.file02 = new File([],'',undefined);
      } else if (elementId === 'inputGroupFile03') {
        this.errorFile03 = false;
        this.previewSvc.file03 = new File([],'',undefined);
      } else if (elementId === 'inputGroupFile03') {
        this.errorFile03 = false;
        this.previewSvc.file03 = new File([],'',undefined);
      } else if (elementId === 'inputProfilePhoto') {
        this.errorProfilePhoto = false;
        this.previewSvc.profilePhoto = new File([],'',undefined);
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
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }

}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}