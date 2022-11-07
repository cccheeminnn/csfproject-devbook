import { Injectable } from "@angular/core";

// common stuff
@Injectable()
export class SharedService {

  // to display message in the popup
  private _snackbarMsg!: string;
  public get snackbarMsg() {
    return this._snackbarMsg;
  }
  public set snackbarMsg(message: string) {
    this._snackbarMsg = message;
  }
  private _fontColor!: string;
  public get fontColor() {
    return this._fontColor;
  }
  public set fontColor(fc: string) {
    this._fontColor = fc;
  }
  displayMessage(msg: string, fc: string) {
    this.snackbarMsg = msg;
    this.fontColor = fc;
  }


  // location search string
  private _searchLocation!: string;
  public get searchLocation() {
    return this._searchLocation;
  }
  public set searchLocation(searchLocation: string) {
    this._searchLocation = searchLocation;
  }
}
