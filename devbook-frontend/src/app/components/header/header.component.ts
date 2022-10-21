import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSelectionList } from '@angular/material/list';
import { Subject } from 'rxjs';
import { BackendService } from '../../services/backend.service';
import { DevbookUser } from '../../models/models';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { PreviewService } from '../../services/preview.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
    private previewSvc: PreviewService,
    private snackbar: MatSnackBar) {
    backendSvc.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  // fetch notifications > then openMenu
  openNotificationsPanel() {
    this.notificationTrigger.openMenu;
  }

  notificationClicked() {
    console.info('>>> notification clicked: ', this.notifications.selectedOptions.selected[0].value);
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

    this.backendSvc.logout();

    this.previewSvc.snackbarMsg = 'LOGOUT_SUCCESSFUL';
    this.snackbar.openFromComponent(SnackbarComponent, {duration:3000, verticalPosition: 'top'});

    this.router.navigate(['/login']);
  }

  searchUser() {
    if (this.searchTerm == '') {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['/filter'], {queryParams: {filterby: this.searchTerm}});
    }
    this.searchTerm = '';
  }
}
