import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Registration } from "../models/models";
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BackendService {

    constructor(
        private http: HttpClient
    ) { }

    register(reg: FormData):Promise<string> {

        return firstValueFrom(
            this.http.post<string>('/api/register', reg)
        );
    }

}