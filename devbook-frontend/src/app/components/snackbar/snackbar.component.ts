import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  private _message = '';
  set message(msg: string) {
    this._message = msg;
  }
  get message() {
    return this._message;
  }

  private _fontColor = '';
  set fontColor(fc: string) {
    this._fontColor = fc;
  }
  get fontColor() {
    return this._fontColor;
  }


  constructor(
    private sharedSvc: SharedService,
  ) {
    this.message = sharedSvc.snackbarMsg;
    this.fontColor = sharedSvc.fontColor;
  }

  ngOnInit(): void {
  }

}
