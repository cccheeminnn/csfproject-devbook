import { Injectable } from "@angular/core";
import { FormGroup } from '@angular/forms';

// holds the form value for preview only
@Injectable()
export class PreviewService {

  constructor() { }

  private _formGrp!: FormGroup;
  public get formGrp() {
    return this._formGrp;
  }
  public set formGrp(fg: FormGroup) {
    this._formGrp = fg;
  }

  private _file01!: File;
  public get file01() {
    return this._file01;
  }
  public set file01(f: File) {
    this._file01 = f;
  }

  private _file02!: File;
  public get file02() {
    return this._file02;
  }
  public set file02(f: File) {
    this._file02 = f;
  }

  private _file03!: File;
  public get file03() {
    return this._file03;
  }
  public set file03(f: File) {
    this._file03 = f;
  }

  private _profilePhoto!: File;
  public get profilePhoto() {
    return this._profilePhoto;
  }
  public set profilePhoto(f: File) {
    this._profilePhoto = f;
  }

  // to display message in the popup
  private _snackbarMsg!: string;
  public get snackbarMsg() {
    return this._snackbarMsg;
  }
  public set snackbarMsg(message: string) {
    this._snackbarMsg = message;
  }

  reset() {
    this.formGrp.reset();
  }
}
