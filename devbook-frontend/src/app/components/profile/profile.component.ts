import { Component, OnInit, OnDestroy } from '@angular/core';
import { DevbookUserComments, DevbookUser, CurrentUserLiked, CurrentUserRated } from '../../models/models';
import { BackendService } from '../../services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { GoogleComponent } from '../google/google.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  currentUserSub$!: Subscription;

  // for small stuff
  loading!: boolean;
  // for whole page
  pageLoading!: boolean;

  ttlNoOfImgToLoad: number = 0;
  ttlNoOfImgLoaded: number = 0;

  formGrp!: FormGroup;
  textAreaInput = '';

  currentUser!: DevbookUser | null;
  likedUser!: boolean;
  ratedUser!: boolean;
  sameUser: boolean = false;
  ratingValue!: string;

  user!: DevbookUser;
  userId!: string;
  userComments!: DevbookUserComments[];

  constructor(
    private router: Router,
    private backendSvc: BackendService,
    private activatedRoute: ActivatedRoute,
    private sharedSvc: SharedService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private carouselConfig: NgbCarouselConfig,
    private dialog: MatDialog) {

    this.loading = true;
    this.pageLoading = true;

    this.currentUserSub$ = this.backendSvc.currentUser.subscribe(x => this.currentUser = x);

    carouselConfig.interval = 4000;
  }

  ngOnDestroy(): void {
    this.currentUserSub$.unsubscribe();
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.retrieveUserDetails(this.userId);

    this.formGrp = this.fb.group(
      {
        email: this.fb.control<string>(''),
        id: this.fb.control<string>(''),
        comment_email: this.fb.control<string>(''),
        name: this.fb.control<string>(''),
        text: this.fb.control<string>('')
      }
    )

  }

  retrieveUserDetails(userId: string) {
    this.backendSvc.retrieveUserDetails(userId).then(result => {
      this.user = result;
      this.userComments = this.user.comments;
      this.ratingValue = this.user.ratings;
      this.pageLoading = false;
      // means theres a user logged in
      if (this.currentUser != null) {
        // check if currently logged in user liked/rated this user
        this.checkLikedOrRated();
        // check if currently logged in user is the same as profile user
        if (this.currentUser.id == this.user.id) {
          this.sameUser = true;
        }
      }
      this.user.images.forEach(img => {
        this.ttlNoOfImgToLoad += 1;
      })
      if(this.ttlNoOfImgToLoad == 0) {
        this.ttlNoOfImgToLoad += 1;
        this.imgLoaded();
      }
      this.loading = false;
    }).catch(error => {
      console.log('>>>> retrieve user details error: ', error)
    })
  }

  checkLikedOrRated() {
    this.backendSvc.checkIfLiked(this.user.email, this.currentUser!.email).then(result => {
      this.likedUser = result;
      // console.log('have i like? ', this.likedUser);
    }).catch(error => {
    });
    this.backendSvc.checkIfRated(this.user.email, this.currentUser!.email).then(result => {
      this.ratedUser = result;
      // console.log('have i rated? ', this.ratedUser);
    }).catch(error => {
    });
  }

  likePressed() {
    this.loading = true;
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
          this.loading = false;
          this.sharedSvc.displayMessage('LIKED', 'greenyellow');
          this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
        }).catch(error => {
          this.loading = false;
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
          this.loading = false;
          this.sharedSvc.displayMessage('UNLIKED', 'hotpink');
          this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
        }).catch(error => {
          this.loading = false;
          // console.log('>>>>liked error', error)
        })
      }
    }
  }

  ratePressed() {
    this.loading = true;
    if (this.currentUser == null) {
      this.router.navigate(['/login'])
    } else {
      const payload: CurrentUserRated = {
        userEmail: this.user.email,
        currentUserEmail: this.currentUser!.email,
        ratingGiven: this.ratingValue
      }
      // console.log(payload);

      if (!this.sameUser) {
        this.backendSvc.rated(payload).then(result => {
          // console.log('>>>>rated result', result)
          this.ratingValue = result.data
          this.loading = false;
          this.sharedSvc.displayMessage('RATED', 'greenyellow');
          this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
        }).catch(error => {
          this.loading = false;
          // console.log('>>>>rated error', error)
        })
      } else {
        this.loading = false;
        this.sharedSvc.displayMessage('YOU_CAN\'T_RATE_YOURSELF_SILLY', 'hotpink');
        this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
        this.backendSvc.retrieveUserDetails(this.userId).then(result => {
          this.ratingValue = this.user.ratings;
        })
      }
    }
  }

  addComment() {
    this.loading = true;
    this.formGrp.controls['email'].setValue(this.user.email);
    this.formGrp.controls['id'].setValue(this.currentUser!.id);
    this.formGrp.controls['comment_email'].setValue(this.currentUser!.email);
    this.formGrp.controls['name'].setValue(this.currentUser!.name);
    this.formGrp.controls['text'].setValue(this.textAreaInput);
    const comment: DevbookUserComments = this.formGrp.value as DevbookUserComments;
    // console.log('>>>new comments details: ', comment);

    this.userComments.push(comment);

    this.backendSvc.insertComment(comment).then(result => {
      this.loading = false;
      this.sharedSvc.displayMessage('COMMENT_ADDED', 'greenyellow');
      this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
    }).catch(error => {
      this.loading = false;
    });
    this.textAreaInput = '';
    this.formGrp.reset();
  }

  openOutlook() {
    window.open(`mailto:${this.user.email}?subject=Hi ${this.user.name} from Devbook&body=I saw your profile on Devbook!`);
  }

  routeToLogin() {
    document.documentElement.scrollTop = 0; // scroll to top of page automatically
    this.router.navigate(['/login']);
  }

  imgLoaded() {
    this.ttlNoOfImgLoaded += 1;
    if (this.ttlNoOfImgToLoad == this.ttlNoOfImgLoaded) {
      this.loading = false;
      this.pageLoading = false;
    }
  }

  openMaps(coy: string) {
    if (coy.length == 0) {
      return;
    } else {
      this.sharedSvc.searchLocation = this.user.currentCompany;
      const previewRef = this.dialog.open(GoogleComponent);
    }
  }
}
