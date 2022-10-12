import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSelectionList } from '@angular/material/list';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  sidenav = new Subject<void>();

  @ViewChild('notificationsTrigger')
  notificationTrigger!: MatMenuTrigger;

  @ViewChild('notifications')
  notifications!: MatSelectionList;

  constructor() { }

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

}
