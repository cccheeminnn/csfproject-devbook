import { Component, OnInit, ViewChild, Output, OnDestroy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSelectionList } from '@angular/material/list';
import { Subject, Subscription } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { DevbookUser, CurrentUserNotifications } from '../../models/models';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUser$!: Subscription;
  notificationsCount$!: Subscription;

  loading!: boolean;

  noNotifications = false;
  newNotificationsCount: number = 0;
  userNotifications!: CurrentUserNotifications[];

  searchTerm = '';

  currentUser!: DevbookUser | null;

  @Output()
  sidenav = new Subject<void>();

  @ViewChild('sidenavDrawer')
  sidenavDrawer!: MatDrawer;

  @ViewChild('notificationsTrigger')
  notificationTrigger!: MatMenuTrigger;

  @ViewChild('notifications')
  notifications!: MatSelectionList;

  constructor(
    private router: Router,
    private backendSvc: BackendService,
    private sharedSvc: SharedService,
    private snackbar: MatSnackBar) {
    this.currentUser$ = backendSvc.currentUser.subscribe(x => this.currentUser = x);
    this.notificationsCount$ = backendSvc.notificationsCountObs.subscribe(x => this.newNotificationsCount = x);
  }

  ngOnDestroy(): void {
    this.currentUser$.unsubscribe();
    this.notificationsCount$.unsubscribe();
  }

  ngOnInit(): void {
    if (this.currentUser != null) {
      // retrieve new notifications count from backend
      this.backendSvc.getNewNotificationsCount(this.currentUser.email).then(result => {
        // console.log('no of new notifications> ', result)
        this.newNotificationsCount = result;
      });
    }
  }

  // fetch notifications > then openMenu
  openNotificationsPanel() {
    this.notificationTrigger.openMenu;
    // open notifications panel then fetch actual notifications content
    if (this.newNotificationsCount > 0) {
      this.backendSvc.updateNotificationsStatus(this.currentUser!.email);
      this.newNotificationsCount = 0;
    }

    this.backendSvc.getNotifications(this.currentUser!.email).then(results => {
      // console.log(JSON.parse(results.data));
      this.userNotifications = JSON.parse(results.data);
    }).catch(error => {
      // console.error(error)
      this.noNotifications = true;
    })

  }

  notificationClicked() {
    // go to profile page
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/user', this.currentUser!.id, 'profile']).then(navigate => {
      document.documentElement.scrollTop = 0;
    });
  }

  openSidenav() {
    this.sidenav.next();
  }

  toggleDrawer() {
    if (this.sidenavDrawer.opened) {
      this.sidenavDrawer.toggle();
    }
  }

  logout() {
    this.sidenavDrawer.toggle();
    this.backendSvc.logout().then(result => {
      this.userNotifications = [];

      this.sharedSvc.displayMessage('LOGOUT_SUCCESSFUL', 'greenyellow');
      this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });

      this.router.navigate(['/login']);
    }).catch(error => {
      this.sharedSvc.displayMessage('LOGOUT_UNSUCCESSFUL', 'hotpink');
      this.snackbar.openFromComponent(SnackbarComponent, { duration: 3000, verticalPosition: 'top' });
    });


  }

  searchUser() {
    if (this.searchTerm == '') {
      this.router.navigate(['']);
    } else {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['/filter'], { queryParams: { filterby: this.searchTerm } }).then(result => {
        // this.sharedSvc.searchUser(this.searchTerm); // emit subject
        this.searchTerm = '';
      })
    }
  }

  goToProfile() {
    this.sidenavDrawer.toggle(false).then(result => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate(['/user', this.currentUser!.id, 'profile']).then(navigate => {
        document.documentElement.scrollTop = 0;
      })
    })
  }
}
