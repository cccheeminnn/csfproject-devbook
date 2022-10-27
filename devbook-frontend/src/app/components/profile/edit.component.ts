import { Component, OnInit, ViewChild } from '@angular/core';
import { DevbookUser, DevbookUserWebsites, DevbookUserSkills, DevbookUserImages, SecondPanelData } from '../../models/models';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { PreviewService } from '../../services/preview.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { UpdateService } from '../../services/update.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  loading!: boolean;

  // for Expand/Collaspe all
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion;

  // for password field toggle visibility
  hide: boolean = true;

  currentUser!: DevbookUser | null;
  currentUserId = this.currentUser?.id;

  user!: DevbookUser;
  userId: string = this.activatedRoute.snapshot.params['id'];
  profilePhotoSrc!: File | string;
  image01Src: File | string = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/editimgplaceholder.jpg';
  image01Desc: string = '';
  img01Avail = false;
  image02Src: File | string = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/editimgplaceholder.jpg';
  image02Desc: string = '';
  img02Avail = false;
  image03Src: File | string = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/editimgplaceholder.jpg';
  image03Desc: string = '';
  img03Avail = false;

  firstPanelFormGrp!: FormGroup; // account info
  secondPanelFormGrp!: FormGroup; // occupation/education
  thirdPanelFormGrp!: FormGroup; // skills
  skillsArray!: FormArray;
  fourthPanelFormGrp!: FormGroup; // websites
  websitesArray!: FormArray;
  fifthPanelFormGrp!: FormGroup; // screenshots

  constructor(
    private fb: FormBuilder,
    private backendSvc: BackendService,
    private updateSvc: UpdateService,
    private previewSvc: PreviewService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.loading = true;

    backendSvc.currentUser.subscribe(x => this.currentUser = x)
  }

  ngOnInit(): void {
    if (this.currentUser == null || this.currentUser.id != this.userId) {
      this.backendSvc.logout();
      this.router.navigate(['/login'])
    } else {
      this.backendSvc.retrieveUserDetails(this.userId).then(result => {
        this.user = result;
        this.profilePhotoSrc = `https://bigbook.sgp1.digitaloceanspaces.com/users/${this.user.id}/profilephoto.jpg`
        this.initImageDisplay(this.user.images);
        this.initPanelFormGrps();
        this.loading = false;
      }).catch(error => {
        this.loading = false;
        this.previewSvc.snackbarMsg = 'ERROR_OCCURRED, REFRESH_&_TRY_AGAIN';
        this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' }); // 3000 is 3s
      })

    }
  }

  initPanelFormGrps() {

    this.firstPanelFormGrp = this.fb.group({
      userEmail: this.fb.control<string>(this.user.email),
      profilePhoto: [null], // inserted during input (change) event
      bio: this.fb.control<string>(this.user.bio, [Validators.required, Validators.minLength(10)]),
    })

    this.secondPanelFormGrp = this.fb.group({
      userEmail: this.fb.control<string>(this.user.email),
      currentJob: this.fb.control<string>(this.user.currentJob),
      currentCompany: this.fb.control<string>(this.user.currentCompany),
      previousCompany: this.fb.control<string>(this.user.previousCompany),
      education: this.fb.control<string>(this.user.education, [Validators.required]),
    })

    this.skillsArray = this.fb.array([], [Validators.required, Validators.minLength(1)]);
    for (let i = 0; i < this.user.skills.length; i++) {
      this.pushCurrentSkillsArray(this.user.skills[i]);
    }
    this.thirdPanelFormGrp = this.fb.group({
      userEmail: this.fb.control<string>(this.user.email),
      skills: this.skillsArray
    })

    this.websitesArray = this.fb.array([], [Validators.required, Validators.minLength(1)]);
    for (let i = 0; i < this.user.websites.length; i++) {
      this.pushCurrentWebsitesArray(this.user.websites[i]);
    }
    this.fourthPanelFormGrp = this.fb.group({
      userEmail: this.fb.control<string>(this.user.email),
      websites: this.websitesArray
    })

    this.fifthPanelFormGrp = this.fb.group({
      userEmail: this.fb.control<string>(this.user.email),
      file01: [null], // inserted during input (change) event
      file01Description: this.fb.control<string>(this.user.images[0]?.description || ''),
      file02: [null], // inserted during input (change) event
      file02Description: this.fb.control<string>(this.user.images[1]?.description || ''),
      file03: [null], // inserted during input (change) event
      file03Description: this.fb.control<string>(this.user.images[2]?.description || '')
    })
  }

  pushCurrentSkillsArray(skill: DevbookUserSkills) {
    const currentSkill = this.fb.group({
      name: this.fb.control<string>(skill.name),
      rating: this.fb.control<number>(+skill.rating)
    })
    this.skillsArray.push(currentSkill);
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

  pushCurrentWebsitesArray(website: DevbookUserWebsites) {
    const currentWebsite = this.fb.group({
      name: this.fb.control<string>(website.name),
      url: this.fb.control<string>(website.url)
    })
    this.websitesArray.push(currentWebsite);
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

  initImageDisplay(imagesArr: DevbookUserImages[]) {
    imagesArr.forEach(img => {
      if (img.name == 'image01.jpg') {
        this.image01Src = 'https://bigbook.sgp1.digitaloceanspaces.com/users/' + this.user.id + '/' + img.name
        this.image01Desc = img.description != undefined ? img.description : '';
        this.img01Avail = true;
      } else if (img.name == 'image02.jpg') {
        this.image02Src = 'https://bigbook.sgp1.digitaloceanspaces.com/users/' + this.user.id + '/' + img.name
        this.image02Desc = img.description != undefined ? img.description : '';
        this.img02Avail = true;
      } else if (img.name == 'image03.jpg') {
        this.image03Src = 'https://bigbook.sgp1.digitaloceanspaces.com/users/' + this.user.id + '/' + img.name
        this.image03Desc = img.description != undefined ? img.description : '';
        this.img03Avail = true;
      }
    })
  }

  deleteUploadedImg(img: string) {
    this.loading = true;
    console.log(img);
    if (img == 'image01') {
      this.image01Src = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/editimgplaceholder.jpg';
      this.image01Desc = '';
      this.img01Avail = false;
    } else if (img == 'image02') {
      this.image02Src = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/editimgplaceholder.jpg';
      this.image02Desc = '';
      this.img02Avail = false;
    } else if (img == 'image03') {
      this.image03Src = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/editimgplaceholder.jpg';
      this.image03Desc = '';
      this.img03Avail = false;
    }
    this.updateSvc.deleteImage(this.userId, (img + '.jpg')).then(result => {
      this.loading = false;
      this.previewSvc.snackbarMsg = 'DELETE_SUCCESSFUL';
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' }); // 3000 is 3s
    }).catch(error => { // chances are jwt expired
      this.loading = false;
      this.backendSvc.logout();
      this.previewSvc.snackbarMsg = 'PLEASE_LOGIN_AGAIN';
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
      this.router.navigate(['/login'])
    });
  }

  saveFirstPanel() {
    this.loading = true;
    if (this.firstPanelFormGrp.controls['profilePhoto'].value === null) {
      const blankFile: File = new File([], '');
      this.firstPanelFormGrp.controls['profilePhoto'].setValue(blankFile);

    }

    let formData = new FormData();

    Object.keys(this.firstPanelFormGrp.controls).forEach(formControlName => {
      formData.append(formControlName, this.firstPanelFormGrp.get(formControlName)?.value)
    })

    this.updateSvc.updateFirstPanel(formData).then(result => {
      this.loading = false;
      this.previewSvc.snackbarMsg = 'CHANGES_SAVED';
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
    }).catch(error => { // chances are jwt expired
      this.loading = false;
      this.backendSvc.logout();
      this.previewSvc.snackbarMsg = 'PLEASE_LOGIN_AGAIN';
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
      this.router.navigate(['/login'])
    });
  }

  saveSecondPanel() {
    this.loading = true;
    const secondPanelFG = this.secondPanelFormGrp.value as SecondPanelData
    this.updateSvc.updateSecondPanel(secondPanelFG).then(result => {
      this.loading = false;
      this.previewSvc.snackbarMsg = 'CHANGES_SAVED';
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
    }).catch(error => { // chances are jwt expired
      this.loading = false;
      this.backendSvc.logout();
      this.previewSvc.snackbarMsg = 'PLEASE_LOGIN_AGAIN';
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
      this.router.navigate(['/login'])
    });
  }

  saveThirdPanel() {
    this.loading = true;
    const updatedSkillsArray = this.thirdPanelFormGrp.value as DevbookUserSkills
    console.log(updatedSkillsArray);
    this.updateSvc.updateThirdPanel(updatedSkillsArray).then(result => {
      this.loading = false;
      this.previewSvc.snackbarMsg = 'CHANGES_SAVED';
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
    }).catch(error => { // chances are jwt expired
      this.loading = false;
      this.backendSvc.logout();
      this.previewSvc.snackbarMsg = 'PLEASE_LOGIN_AGAIN';
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
      this.router.navigate(['/login'])
    });
  }

  saveFourthPanel() {
    this.loading = true;
    const updatedWebsitesArray = this.fourthPanelFormGrp.value as DevbookUserWebsites
    console.log(updatedWebsitesArray);
    this.updateSvc.updateFourthPanel(updatedWebsitesArray).then(result => {
      this.loading = false;
      this.previewSvc.snackbarMsg = 'CHANGES_SAVED';
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
    }).catch(error => { // chances are jwt expired
      this.loading = false;
      this.backendSvc.logout();
      this.previewSvc.snackbarMsg = 'PLEASE_LOGIN_AGAIN';
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
      this.router.navigate(['/login'])
    });
  }

  saveFifthPanel() {
    this.loading = true;
    const blankFile = new File([], '');
    if (this.fifthPanelFormGrp.controls['file01'].value === null) {
      this.fifthPanelFormGrp.controls['file01'].setValue(blankFile);
    }
    this.fifthPanelFormGrp.controls['file01Description'].setValue(this.image01Desc)

    if (this.fifthPanelFormGrp.controls['file02'].value === null) {
      this.fifthPanelFormGrp.controls['file02'].setValue(blankFile);
    }
    this.fifthPanelFormGrp.controls['file02Description'].setValue(this.image02Desc)

    if (this.fifthPanelFormGrp.controls['file03'].value === null) {
      this.fifthPanelFormGrp.controls['file03'].setValue(blankFile);
    }
    this.fifthPanelFormGrp.controls['file03Description'].setValue(this.image03Desc)

    let formData = new FormData();
    Object.keys(this.fifthPanelFormGrp.controls).forEach(formControlName => {
      formData.append(formControlName, this.fifthPanelFormGrp.controls[formControlName].value);
    })
    console.log(this.fifthPanelFormGrp.value)
    this.updateSvc.updateFifthPanel(formData).then(result => {
      this.loading = false;
      this.previewSvc.snackbarMsg = 'CHANGES_SAVED';
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
    }).catch(error => { // chances are jwt expired
      this.loading = false;
      this.backendSvc.logout();
      this.previewSvc.snackbarMsg = 'PLEASE_LOGIN_AGAIN';
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
      this.router.navigate(['/login'])
    });
  }

  // check type of selected file for upload
  errorFile01: boolean = false; // showcase picture 1
  errorFile02: boolean = false; // showcase picture 2
  errorFile03: boolean = false; // showcase picture 3
  errorProfilePhoto: boolean = false; // profile picture
  readFileType(fileEvent: HTMLInputEvent) {
    const inputFile: File = fileEvent.target.files![0];
    const elementId = fileEvent.target.id;

    var reader = new FileReader();

    try {
      // user uploads correct file, typeof image
      if (inputFile.type.startsWith('image') && inputFile.size < 1048576) {
        reader.readAsDataURL(inputFile);
        console.log('file size>> ', inputFile.size)
        reader.onload = (event: any) => {
          if (elementId === 'inputProfilePhoto') {
            this.errorProfilePhoto = false;
            this.profilePhotoSrc = event.target.result;
            this.firstPanelFormGrp.controls['profilePhoto'].setValue(inputFile);
          } else if (elementId === 'inputFile01') {
            this.errorFile01 = false;
            this.image01Src = event.target.result;
            this.fifthPanelFormGrp.controls['file01'].setValue(inputFile);
          } else if (elementId === 'inputFile02') {
            this.errorFile02 = false;
            this.image02Src = event.target.result;
            this.fifthPanelFormGrp.controls['file02'].setValue(inputFile);
          } else if (elementId === 'inputFile03') {
            this.errorFile03 = false;
            this.image03Src = event.target.result;
            this.fifthPanelFormGrp.controls['file03'].setValue(inputFile);
          }
        }
      } else { // user uploaded something else, not image/type
        if (elementId === 'inputProfilePhoto') {
          this.errorProfilePhoto = true;
          this.profilePhotoSrc = `https://bigbook.sgp1.digitaloceanspaces.com/users/${this.user.id}/profilephoto.jpg`
          this.firstPanelFormGrp.controls['profilePhoto'].reset();
        } else if (elementId === 'inputFile01') {
          this.errorFile01 = true;
          this.image01Src = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/editimgplaceholder.jpg';
          this.fifthPanelFormGrp.controls['file01'].reset();
        } else if (elementId === 'inputFile02') {
          this.errorFile02 = true;
          this.image02Src = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/editimgplaceholder.jpg';
          this.fifthPanelFormGrp.controls['file02'].reset();
        } else if (elementId === 'inputFile03') {
          this.errorFile03 = true;
          this.image03Src = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/editimgplaceholder.jpg';
          this.fifthPanelFormGrp.controls['file03'].reset();
        }
      }
    } catch (error) { // user press upload, then cancel
      if (elementId === 'inputProfilePhoto') {
        this.errorProfilePhoto = false;
        this.firstPanelFormGrp.controls['profilePhoto'].reset();
        this.profilePhotoSrc = `https://bigbook.sgp1.digitaloceanspaces.com/users/${this.user.id}/profilephoto.jpg`
      } else if (elementId === 'inputFile01') {
        this.errorFile01 = false;
        this.fifthPanelFormGrp.controls['file01'].reset();
        this.image01Src = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/editimgplaceholder.jpg';
      } else if (elementId === 'inputFile02') {
        this.errorFile02 = false;
        this.fifthPanelFormGrp.controls['file02'].reset();
        this.image02Src = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/editimgplaceholder.jpg';
      } else if (elementId === 'inputFile03') {
        this.errorFile03 = false;
        this.fifthPanelFormGrp.controls['file03'].reset();
        this.image03Src = 'https://bigbook.sgp1.digitaloceanspaces.com/Templates/editimgplaceholder.jpg';
      }
    }
  }

  imgLoaded() {
    this.loading = false;
  }
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
