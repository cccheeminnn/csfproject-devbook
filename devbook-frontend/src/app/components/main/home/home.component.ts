import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DevbookUser } from 'src/app/models/models';
import { BackendService } from '../../../services/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PreviewService } from '../../../services/preview.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  sub$!: Subscription;

  alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p','q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  filterBy!:string;
  limit: number = 8;
  offset: number = 0;
  pageSizeOptions = [1, 8, 12, 16, 20];
  ttlUserCount: number = 0;
  devbookUsers: DevbookUser[] = [];

  constructor(
    carouselConfig: NgbCarouselConfig,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private backendSvc: BackendService,
    private previewSvc: PreviewService)
  {
    carouselConfig.interval = 0
    carouselConfig.showNavigationIndicators = false;
    this.sub$ = this.activatedRoute.queryParams.subscribe(params => {
      this.filterBy = params['filterby'];
      if (this.filterBy != undefined) {
        this.filterByAlp(this.filterBy)
      }
      // console.log('>>>subscribe',params['filterby']);
    })
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  ngOnInit(): void {
    // console.log('filterBy value:', this.filterBy)
    if (this.filterBy != undefined) {
      this.filterByAlp(this.filterBy);
    } else {
      this.retrieveDisplayInfoFromBackend();
    }
  }

  // mat-paginator EventEmitters
  onPageEvent(event: PageEvent)
  {
    // user changes items per page
    this.limit = event.pageSize;
    // user press next/previous page
    this.offset = (event.pageSize * event.pageIndex);
    if (this.filterBy != undefined) {
      this.filterByAlp(this.filterBy)
    } else {
      this.retrieveDisplayInfoFromBackend();
    }

  }

  // retrieve total user count and user info from backend
  retrieveDisplayInfoFromBackend()
  {
    this.backendSvc.retrieveTotalUserCount().then(result => {
      document.documentElement.scrollTop = 0; // scroll to top of page automatically
      this.ttlUserCount = result;
    }).catch(error => {
      console.error('>>>> an error occurred while retrieving total user count', error);
    })

    this.backendSvc.retrieveAllUsers(this.limit, this.offset).then(results => {
      this.devbookUsers = results;
    }).catch(error => {
      console.error('>>>> an error has occurred while retrieving users from backend', error);
    })
  }

  filterByAlp(alp: string) {
    this.router.navigate(['/filter'], { queryParams: { filterby: alp } });

    this.backendSvc.retrieveTotalFilteredUserCount(alp).then(result => {
      this.ttlUserCount = result;
    }).catch(error => {
      console.error('>>>> an error occurred while retrieving total filtered user count', error);
      this.previewSvc.snackbarMsg = 'NO_USERS_FOUND';
      this.snackBar.openFromComponent(SnackbarComponent, {duration: 3000, verticalPosition: 'top'}); // 3000 is 3s
    })

    this.backendSvc.retrieveFilteredUsers(this.limit, this.offset, alp).then(results => {
      this.devbookUsers = results;
    }).catch(error => {
      console.error('>>>> an error has occurred while retrieving filtered users from backend', error);
    })
  }
}
