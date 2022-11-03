import { DevbookUserComments, LoginFormDetails } from './../models/models';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map, Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { DevbookUser, CurrentUserLiked, CurrentUserRated, Response } from '../models/models';

@Injectable()
export class BackendService {

  private currentUserSubject: BehaviorSubject<DevbookUser | null>;
  public currentUser: Observable<DevbookUser | null>;

  private notificationsSub: ReplaySubject<number> = new ReplaySubject<number>;
  public notificationsCountObs: Observable<number>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<DevbookUser | null>(
      JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();

    this.notificationsCountObs = this.notificationsSub.asObservable();
  }

  public get currentUserValue(): DevbookUser | null{
    return this.currentUserSubject.value;
  }

  login(formValue: LoginFormDetails): Promise<DevbookUser> {
    return firstValueFrom(
      this.http.post<DevbookUser>('/authenticate', formValue).pipe(map(user=> {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }))
    )
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null); 
  }

  register(reg: FormData): Promise<string> {
    return firstValueFrom(
      this.http.post<string>('/api/register', reg)
    );
  }

  insertComment(comment: DevbookUserComments): Promise<Response> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return firstValueFrom(
      this.http.post<Response>('/api/insertcomment', comment, { headers })
    )
  }

  retrieveAllUsers(limit: number, offset: number): Promise<DevbookUser[]> {
    const params: HttpParams = new HttpParams().set('limit', limit).set('offset', offset);

    return firstValueFrom(
      this.http.get<DevbookUser[]>('/api/retrieveall', { params })
    )
  }

  retrieveTotalUserCount(): Promise<number> {
    return firstValueFrom(
      this.http.get<number>('/api/usercount')
    )
  }

  retrieveFilteredUsers(limit: number, offset: number, filter: string): Promise<DevbookUser[]>
  {
    const params: HttpParams = new HttpParams().set('limit', limit).set('offset', offset).set('filter', filter);

    return firstValueFrom(
      this.http.get<DevbookUser[]>('/api/retrievefilteredresults', { params })
    )
  }

  retrieveTotalFilteredUserCount(filter: string)
  {
    const params = new HttpParams().set('filter', filter);

    return firstValueFrom(
      this.http.get<number>('/api/usercount/filtered', { params })
    )
  }

  retrieveUserDetails(id: string): Promise<DevbookUser> {
    const params: HttpParams = new HttpParams()
      .set('id', id);

    return firstValueFrom(
      this.http.get<DevbookUser>('/api/retrieveuserdetails', { params })
    )
  }

  // likes
  checkIfLiked(user: string, currentUser: string): Promise<boolean> {
    const params = new HttpParams().set('userEmail', user).set('currentUser', currentUser);
    return firstValueFrom(
      this.http.get<boolean>('/api/checkliked', { params })
    )
  }

  liked(body :CurrentUserLiked): Promise<Response> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return firstValueFrom(
      this.http.post<Response>('/api/liked', body, { headers })
    )
  }

  // ratings
  checkIfRated(user: string, currentUser: string): Promise<boolean> {
    const params = new HttpParams().set('userEmail', user).set('currentUser', currentUser);
    return firstValueFrom(
      this.http.get<boolean>('/api/checkrated', { params })
    )
  }

  rated(body: CurrentUserRated) {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

    return firstValueFrom(
      this.http.post<Response>('/api/rated', body, { headers },)
    )
  }

  getQuote(): Promise<Response> {
    return firstValueFrom(
      this.http.get<Response>('/api/quote')
    )
  }

  // notifications
  getNewNotificationsCount(userEmail: string):Promise<number> {
    const params = new HttpParams().append('userEmail', userEmail);

    return firstValueFrom(
      this.http.get<number>('/api/countofnewnotifications', { params }).pipe(map(result => {
        this.notificationsSub.next(result);
        // console.log('map? ', result);
        return result;
      }))
    )
  }

  updateNotificationsStatus(userEmail: string):Promise<Response> {
    const params = new HttpParams().append('userEmail', userEmail);

    return firstValueFrom(
      this.http.get<Response>('/api/updatenotificationsstatus', { params })
    )
  }

  getNotifications(userEmail: string):Promise<Response> {
    const params = new HttpParams().append('userEmail', userEmail);

    return firstValueFrom(
      this.http.get<Response>('/api/notifications', { params })
    )
  }
}
