import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DevbookUser } from 'src/app/models/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from 'src/app/services/backend.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  paramsFilterBySub$!: Subscription;

  alphabet: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  loading!: boolean;

  // ttl no of carousel images to load
  ttlNoOfImgToLoad: number = 0;
  ttlNoOfImgLoaded: number = 0;

  filterBy!: string;
  filterByAlpStr!: string;
  limit: number = 6;
  offset: number = 0;
  pageSizeOptions = [1, 6, 10, 14];
  ttlUserCount: number = 0;
  devbookUsers: DevbookUser[] = [];
  quote!: string;

  constructor(
    carouselConfig: NgbCarouselConfig,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private backendSvc: BackendService,
    private sharedSvc: SharedService) {

    this.loading = true;

    carouselConfig.interval = 0
    carouselConfig.showNavigationIndicators = false;

    this.paramsFilterBySub$ = this.activatedRoute.queryParams.subscribe(params => {
      this.filterBy = params['filterby'];
      this.filterByAlpStr = params['filterbyalp'];
      // console.log('>>>subscribe',params['filterby']);
    })

  }

  ngOnDestroy(): void {
    this.paramsFilterBySub$.unsubscribe();
  }

  ngOnInit(): void {
    // console.log('filterBy value:', this.filterBy)
    if (this.filterBy != undefined) {
      this.filterBySearch(this.filterBy)
    } else if (this.filterByAlpStr != undefined) {
      this.filterByAlp(this.filterByAlpStr);
    } else {
      this.retrieveDisplayInfoFromBackend();
    }

    this.backendSvc.getQuote().then(result => {
      this.quote = result.data
      // console.log(this.quote)
    });
  }

  // mat-paginator EventEmitters
  onPageEvent(event: PageEvent) {
    this.loading = true;
    // user changes items per page
    this.limit = event.pageSize;
    // user press next/previous page
    this.offset = (event.pageSize * event.pageIndex);
    if (this.filterBy != undefined) {
      this.filterBySearch(this.filterBy)
    } else if (this.filterByAlpStr != undefined) {
      this.filterByAlp(this.filterByAlpStr);
    } else {
      this.retrieveDisplayInfoFromBackend();
    }

  }

  // retrieve total user count and user info from backend
  retrieveDisplayInfoFromBackend() {
    this.ttlNoOfImgToLoad = 0;
    this.ttlNoOfImgLoaded = 0;

    this.backendSvc.retrieveTotalUserCount().then(result => {
      document.documentElement.scrollTop = 0; // scroll to top of page automatically
      this.ttlUserCount = result;
    }).catch(error => {
      console.error('>>>> an error occurred while retrieving total user count', error);
    })

    this.backendSvc.retrieveAllUsers(this.limit, this.offset).then(results => {
      this.devbookUsers = results;
      results.forEach(user => {
        this.ttlNoOfImgToLoad += user.images.length
        // console.log('>>>>ttlNoOfCarouselImg', this.ttlNoOfImgToLoad)
      })
      if (this.ttlNoOfImgToLoad == 0) {
        this.ttlNoOfImgToLoad += 1;
      }
    }).catch(error => {
      console.error('>>>> an error has occurred while retrieving users from backend', error);
    })
  }

  filterBySearch(term: string) {
    this.loading = true;
    this.ttlNoOfImgToLoad = 0;
    this.ttlNoOfImgLoaded = 0;

    this.backendSvc.retrieveTotalFilteredUserCount(term).then(result => {
      this.ttlUserCount = result;
    }).catch(error => {
      console.error('>>>> an error occurred while retrieving total filtered user count', error);
      this.loading = false;
      this.sharedSvc.displayMessage('NO_USERS_FOUND', 'hotpink');
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' }); // 3000 is 3s
    })

    this.backendSvc.retrieveFilteredUsers(this.limit, this.offset, term).then(results => {
      this.devbookUsers = results;
      results.forEach(user => {
        this.ttlNoOfImgToLoad += user.images.length
        // console.log('>>>>ttlNoOfCarouselImg', this.ttlNoOfImgToLoad)
      })
      if (this.ttlNoOfImgToLoad == 0) {
        this.ttlNoOfImgToLoad += 1;
      }
    }).catch(error => {
      console.error('>>>> an error has occurred while retrieving filtered users from backend', error);
    })
  }

  filterByAlp(alp: string) {
    this.loading = true;
    this.ttlNoOfImgToLoad = 0;
    this.ttlNoOfImgLoaded = 0;

    this.backendSvc.retrieveTotalFilteredAlpUserCount(alp).then(result => {
      this.ttlUserCount = result;
    }).catch(error => {
      console.error('>>>> an error occurred while retrieving total filtered user count', error);
      this.loading = false;
      this.sharedSvc.displayMessage('NO_USERS_FOUND', 'hotpink');
      this.snackBar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' }); // 3000 is 3s
    })

    this.backendSvc.retrieveFilteredAlpUsers(this.limit, this.offset, alp).then(results => {
      this.devbookUsers = results;
      results.forEach(user => {
        this.ttlNoOfImgToLoad += user.images.length
        // console.log('>>>>ttlNoOfCarouselImg', this.ttlNoOfImgToLoad)
      })
      if (this.ttlNoOfImgToLoad == 0) {
        this.ttlNoOfImgToLoad += 1;
      }
    }).catch(error => {
      console.error('>>>> an error has occurred while retrieving filtered users from backend', error);
    })
  }

  imgLoaded() {
    this.ttlNoOfImgLoaded += 1;
    // console.log('loaded> ', this.ttlNoOfImgLoaded)
    // console.log('toLoad> ', this.ttlNoOfImgToLoad)
    if (this.ttlNoOfImgLoaded == this.ttlNoOfImgToLoad) {
      this.loading = false;
    }
    // console.log('loading?> ', this.loading)
  }

  onFilterByAlp(alp: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/filter'], { queryParams: { filterbyalp: alp } });
    this.filterByAlp(alp);
  }

  avatarClicked(id: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/user', id, 'profile']).then(navigate => {
      document.documentElement.scrollTop = 0
    })
  }
}
