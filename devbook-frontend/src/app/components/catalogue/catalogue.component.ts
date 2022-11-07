import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DevbookUser } from '../../models/models';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator

  @ViewChild(MatSort)
  sort!: MatSort

  loading: boolean = true;

  displayedColumns: string[] = ['name', 'currentJob', 'currentCompany', 'skill']
  devbookUsers: DevbookUser[] = [];
  dataSource: MatTableDataSource<DevbookUser>
  totalCount: number = 0;

  constructor(
    private backendSvc: BackendService) {
      this.dataSource = new MatTableDataSource(this.devbookUsers);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.backendSvc.retrieveTotalUserCount().then(result => {
      this.totalCount = result;
      this.backendSvc.retrieveAllUsers(this.totalCount, 0).then(results => {
        this.dataSource.data = results
        this.loading = false;
        console.log('skills length ', results[0].skills.length)
      });
    })
  }

  applyFilter(event: Event) {
    const filterVal = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterVal.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage;
    }
  }

}
