import { Component, OnInit } from '@angular/core';
import { PreviewService } from '../../services/preview.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  message = '';

  constructor(
    private previewSvc: PreviewService,
  ) {
    this.message = previewSvc.snackbarMsg;
  }

  ngOnInit(): void {
  }

}
