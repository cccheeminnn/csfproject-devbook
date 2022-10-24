import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../services/backend.service';
import { DevbookUser, DevbookUserComments, CurrentUserLiked, CurrentUserRated } from '../../../models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreviewService } from '../../../services/preview.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  textAreaInput = '';

  currentUser!: DevbookUser | null;
  likedUser!: boolean;
  ratedUser!: boolean;
  sameUser: boolean = false;

  user!: DevbookUser;
  userId: string = this.activatedRoute.snapshot.params['id'];
  ratingValue!: string;

  formGrp!: FormGroup;
  userComments!: DevbookUserComments[];

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private backendSvc: BackendService,
    private previewSvc: PreviewService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private carouselConfig: NgbCarouselConfig) {
    backendSvc.currentUser.subscribe(x => this.currentUser = x);
    carouselConfig.interval = 4000;
  }

  ngOnInit(): void {
    this.retrieveUserDetails(this.userId);

    this.formGrp = this.fb.group(
      {
        email: this.fb.control<string>(''),
        id: this.fb.control<string>(''),
        name: this.fb.control<string>(''),
        text: this.fb.control<string>('')
      }
    )
  }

  retrieveUserDetails(userId: string) {
    this.backendSvc.retrieveUserDetails(userId).then(result => {
      this.user = result;
      this.ratingValue = result.ratings;
      this.userComments = this.user.comments;
      // means theres a user logged in
      if (this.currentUser != null) {
        // check if currently logged in user liked/rated this user
        this.checkLikedOrRated();
        if (this.currentUser.email == this.user.email) {
          this.sameUser = true;
        }
      }
      // console.log('>>>> user', this.user)
    }).catch(error => {
      console.log('>>>> retrieve user details error: ', error)
    })
  }

  addComment() {
    this.formGrp.controls['email'].setValue(this.user.email);
    this.formGrp.controls['id'].setValue(this.currentUser!.id);
    this.formGrp.controls['name'].setValue(this.currentUser!.name);
    this.formGrp.controls['text'].setValue(this.textAreaInput);
    const comment: DevbookUserComments = this.formGrp.value as DevbookUserComments;
    console.log('>>>new comments details: ', comment);

    this.userComments.push(comment);

    this.backendSvc.insertComment(comment);
    this.textAreaInput = '';
    this.formGrp.reset();
  }

  routeToLogin() {
    document.documentElement.scrollTop = 0; // scroll to top of page automatically
    this.router.navigate(['/login']);
  }

  checkLikedOrRated() {
    this.backendSvc.checkIfLiked(this.user.email, this.currentUser!.email).then(result => {
      this.likedUser = result;
      console.log('have i like? ', this.likedUser);
    }).catch(error => { // chances are jwt expired
      this.backendSvc.logout();
      this.previewSvc.snackbarMsg = 'PLEASE_LOGIN_AGAIN';
      this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
      this.router.navigate(['/login'])
    });
    this.backendSvc.checkIfRated(this.user.email, this.currentUser!.email).then(result => {
      this.ratedUser = result;
      console.log('have i rated? ', this.ratedUser);
    }).catch(error => { // chances are jwt expired
      this.backendSvc.logout();
      this.previewSvc.snackbarMsg = 'PLEASE_LOGIN_AGAIN';
      this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
      this.router.navigate(['/login'])
    });
  }

  likePressed() {
    if (this.currentUser == null) {
      this.router.navigate(['/login']);
    } else {
      if (!this.likedUser) {
        const payload: CurrentUserLiked = {
          userEmail: this.user.email,
          userLike: this.user.likes + 1,
          currentUserEmail: this.currentUser!.email
        }
        this.user.likes += 1;
        this.likedUser = true;

        this.backendSvc.liked(payload).then(result => {
          // console.log('>>>>liked result', result)
          this.previewSvc.snackbarMsg = 'LIKED';
          this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
        }).catch(error => {
          // console.log('>>>>liked error', error)
        })
      } else {
        const payload: CurrentUserLiked = {
          userEmail: this.user.email,
          userLike: this.user.likes - 1,
          currentUserEmail: this.currentUser!.email
        }
        // console.log('>>>>likePressed payload: ', payload)
        this.user.likes += -1;
        this.likedUser = false;

        this.backendSvc.liked(payload).then(result => {
          // console.log('>>>>liked result', result)
          this.previewSvc.snackbarMsg = 'UNLIKED';
          this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
        }).catch(error => {
          // console.log('>>>>liked error', error)
        })
      }
    }
  }

  ratePressed() {
    if (this.currentUser == null) {
      this.router.navigate(['/login'])
    } else {
      const payload: CurrentUserRated = {
        userEmail: this.user.email,
        currentUserEmail: this.currentUser!.email,
        ratingGiven: this.ratingValue
      }
      console.log(payload);

      if (!this.sameUser) {
        this.backendSvc.rated(payload).then(result => {
          // console.log('>>>>rated result', result)
          this.ratingValue = result.data
        }).catch(error => {
          // console.log('>>>>rated error', error)
        })
      } else {
        this.previewSvc.snackbarMsg = 'YOU_CAN\'T_RATE_YOURSELF_SILLY';
        this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
      }
    }
  }

  openOutlook() {
    window.open(`mailto:${this.user.email}?subject=Hi ${this.user.name} from Devbook&body=I saw your profile on Devbook!`);
  }

}
